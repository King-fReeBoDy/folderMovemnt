#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use rusqlite::{Connection, Result};
use serde::{Deserialize, Serialize};


#[derive(Serialize,Deserialize)]
struct User {
    id: i32,
    username: String,
    password: String,
    role: String
}

#[derive(Serialize,Deserialize)]
struct Newuser {
    username: String,
    password: String,
    role: String
}

#[derive(Serialize,Deserialize)]
struct Authenticatelogin {
    username:String,
    password:String
}


fn create_tables() -> Result<()> {
    let conn = Connection::open("foldermanagement.db")?;

    conn.execute(
        "CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            role TEXT NOT NULL
        )",
        [],
    )?;

    conn.execute(
        "CREATE TABLE IF NOT EXISTS records (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            OPDNumber TEXT NOT NULL,
            NameOfPatient TEXT NOT NULL,
            SourceOfRequest TEXT NOT NULL,
            RequestingOfficer TEXT NOT NULL,
            Purpose TEXT NOT NULL,
            FolderTakenBy TEXT NOT NULL,
            FolderIssuedBy TEXT NOT NULL,
            DateOfIssue TEXT NOT NULL,
            FolderReceivedBy TEXT NOT NULL,
            DateOfReceiving TEXT NOT NULL,
            CreateAt DATE
        )",
        [],
    )?;
    
    Ok(())
}

fn create_users(user: Newuser) -> Result<()> {
    let conn = Connection::open("foldermanagement.db")?;

    conn.execute(
        "INSERT INTO users ( username, password, role) VALUES (?1, ?2, ?3)",
         [&user.username[..], &user.password[..], &user.role[..]],
    )?;

    Ok(())
}

fn get_all_users() -> Result<String, rusqlite::Error> {
    let conn = Connection::open("foldermanagement.db")?;

    let mut stmt = conn.prepare("SELECT * FROM users")?;
    let users = stmt
        .query_map([], |row| {
            Ok(User {
                id: row.get(0)?,
                username: row.get(1)?,
                password:row.get(2)?,
                role: row.get(3)?,
            })
        })?
        .collect::<Result<Vec<User>, rusqlite::Error>>()?;
        
    let json_data = serde_json::to_string(&users).unwrap();

    Ok(json_data)
}

fn login (user:Authenticatelogin) ->Result<String> {
    let conn = Connection::open("foldermanagement.db")?;

    let mut stmt = conn.prepare("SELECT * FROM users WHERE username = ?1 AND password = ?2")?;
    let user = stmt.query_row([&user.username, &user.password], |row| {
        Ok(Newuser {
            username: row.get(1)?,
            password: row.get(2)?,
            role: row.get(3)?,
        })
    })?;
    let json_data = serde_json::to_string(&user).unwrap();
    Ok(json_data)
}



#[tauri::command]
fn create_tables_command () -> Result<(), String> {
     if let Err(err) = create_tables() {
        return Err(format!("Failed to create user: {:?}", err));
    }
    Ok(())
}

#[tauri::command]
fn create_users_command (user:String) -> Result<(), String> {
    let user_data: Newuser = serde_json::from_str(&user).unwrap();
     if let Err(err) = create_users(user_data) {
        return Err(format!("Failed to create user: {:?}", err));
    }
    Ok(())
}

#[tauri::command]
fn get_all_users_command () -> Result<serde_json::Value,String> {
      match get_all_users() {
        Ok(json_data) => Ok(json_data),
        Err(err) => Err(err.to_string()),
    }
}

#[tauri::command]
fn login_command (user:String) -> Result<String,String> {
    let user_data: Authenticatelogin = serde_json::from_str(&user).unwrap();
      match login(user_data) {
        Ok(json_data) => Ok(json_data),
        Err(err) => Err(format!("Failed to get user: {:?}", err)),
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![create_tables_command,create_users_command,get_all_users_command,login_command])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
