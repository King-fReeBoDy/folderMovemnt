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

#[derive(Serialize,Deserialize)]
struct Records{
    NameOfPatient:String,
    OPDNumber: String,
    SourceOfRequest :String,
    RequestingOfficer:String,
    Purpose:String,
    FolderTakenBy:String,
    FolderIssuedBy:String,
    DateOfIssue:String,
    FolderReceivedBy:String,
    DateOfReceiving: String
}

#[derive(Serialize,Deserialize)]
struct Newrecord {
    id: i32,
    nameofpatient:String,
    opdnumber: String,
    sourceofrequest :String,
    requestingofficer:String,
    purpose:String,
    foldertakenby:String,
    folderissuedby:String,
    dateofissue:String,
    folderreceivedby:String,
    dateofreceiving: String
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
            nameofpatient TEXT NOT NULL,
            opdnumber TEXT NOT NULL,
            sourceofrequest TEXT NOT NULL,
            requestingofficer TEXT NOT NULL,
            purpose TEXT NOT NULL,
            foldertakenby TEXT NOT NULL,
            folderissuedby TEXT NOT NULL,
            dateofissue TEXT NOT NULL,
            folderreceivedby TEXT NOT NULL,
            dateofreceiving TEXT 
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
                password: row.get(2)?,
                role: row.get(3)?,
            })
        })?
        .collect::<Result<Vec<User>, rusqlite::Error>>()?;
        
    let json_data = serde_json::to_string(&users).unwrap();

    Ok(json_data)
}

fn get_all_records() -> Result<String, rusqlite::Error> {
    let conn = Connection::open("foldermanagement.db")?;

    let mut stmt = conn.prepare("SELECT * FROM records")?;
    let records = stmt
        .query_map([], |row| {
            Ok(Newrecord {
                id:row.get(0)?,
                nameofpatient:row.get(1)?,
                opdnumber: row.get(2)?,
                sourceofrequest :row.get(3)?,
                requestingofficer:row.get(4)?,
                purpose:row.get(5)?,
                foldertakenby:row.get(6)?,
                folderissuedby:row.get(7)?,
                dateofissue:row.get(8)?,
                folderreceivedby:row.get(9)?,
                dateofreceiving: row.get(10)?
            })
        })?
        .collect::<Result<Vec<Newrecord>, rusqlite::Error>>()?;
        
    let json_data = serde_json::to_string(&records).unwrap();

    Ok(json_data)
}


fn get_record_by_id (id: i32) ->Result<String> {
    let conn = Connection::open("foldermanagement.db")?;

    let mut stmt = conn.prepare("SELECT * FROM records WHERE id = ?1")?;
    let id = stmt.query_row([&id], |row| {
        Ok(Newrecord {
                id:row.get(0)?,
                nameofpatient:row.get(1)?,
                opdnumber: row.get(2)?,
                sourceofrequest :row.get(3)?,
                requestingofficer:row.get(4)?,
                purpose:row.get(5)?,
                foldertakenby:row.get(6)?,
                folderissuedby:row.get(7)?,
                dateofissue:row.get(8)?,
                folderreceivedby:row.get(9)?,
                dateofreceiving: row.get(10)?
        })
    })?;
    let json_data = serde_json::to_string(&id).unwrap();
    Ok(json_data)
}

fn delete_record_by_id(id: i32) -> Result<()> {
    let conn = Connection::open("foldermanagement.db")?;

    conn.execute("DELETE FROM records WHERE id = ?", &[&id])?;
    
    Ok(())
}

fn update_record_by_id(record: Newrecord) -> Result<()> {
    let conn = Connection::open("foldermanagement.db")?;

    conn.execute(
        "UPDATE records SET
            nameofpatient = ?,
            opdnumber = ?,
            sourceofrequest = ?,
            requestingofficer = ?,
            purpose = ?,
            foldertakenby = ?,
            folderissuedby = ?,
            dateofissue = ?,
            folderreceivedby = ?,
            dateofreceiving = ?
        WHERE id = ?",
        &[
            &record.nameofpatient,
            &record.opdnumber,
            &record.sourceofrequest,
            &record.requestingofficer,
            &record.purpose,
            &record.foldertakenby,
            &record.folderissuedby,
            &record.dateofissue,
            &record.folderreceivedby,
            &record.dateofreceiving,
            &record.id.to_string()
        ],
    )?;

    Ok(())
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


fn create_records(records:Records) -> Result<()>{
    let conn = Connection::open("foldermanagement.db")?;

    conn.execute(
        "INSERT INTO records ( 
        nameofpatient,
        opdnumber,
        sourceofrequest,
        requestingofficer,
        purpose,
        foldertakenby,
        folderissuedby,
        dateofissue,
        folderreceivedby,
        dateofreceiving
        ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10)
        ",
         [&records.NameOfPatient[..],&records.OPDNumber[..],&records.SourceOfRequest[..],&records.RequestingOfficer[..],&records.Purpose[..],&records.FolderTakenBy[..],&records.FolderIssuedBy[..],&records.DateOfIssue[..],&records.FolderReceivedBy[..],&records.DateOfReceiving[..]],
    )?;

    Ok(())
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
fn get_all_users_command () -> Result<String,String> {
      match get_all_users() {
        Ok(json_data) => Ok(json_data),
        Err(err) => Err(format!("Failed to get user: {:?}", err)),
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


#[tauri::command]
fn create_records_command (newrecord:String) -> Result<(), String> {
    let record_data: Records = serde_json::from_str(&newrecord).unwrap();
     if let Err(err) = create_records(record_data) {
        return Err(format!("Failed to create user: {:?}", err));
    }
    Ok(())
}

#[tauri::command]
fn get_all_records_command () -> Result<String,String> {
      match get_all_records() {
        Ok(json_data) => Ok(json_data),
        Err(err) => Err(format!("Failed to get user: {:?}", err)),
    }
}

#[tauri::command]
fn get_record_by_id_command (id:String) -> Result<String, String> {
    let record_id: i32 = serde_json::from_str(&id).unwrap();
     match get_record_by_id(record_id) {
        Ok(json_data) => Ok(json_data),
        Err(err) => Err(format!("Failed to get user: {:?}", err)),
    }
}

#[tauri::command]
fn delete_record_by_id_command (id:String) -> Result<(), String> {
    let delete_record_id: i32 = serde_json::from_str(&id).unwrap();
     match delete_record_by_id(delete_record_id) {
        Ok(()) => Ok(()),
        Err(err) => Err(format!("Failed to get user: {:?}", err)),
    }
}

#[tauri::command]
fn update_record_by_id_command (record:String) -> Result<(), String> {
    let update_record_id: Newrecord = serde_json::from_str(&record).unwrap();
     match update_record_by_id(update_record_id) {
        Ok(()) => Ok(()),
        Err(err) => Err(format!("Failed to get user: {:?}", err)),
    }

}



fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![create_tables_command,create_users_command,get_all_users_command,login_command,create_records_command,get_all_records_command,get_record_by_id_command,delete_record_by_id_command,update_record_by_id_command])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
