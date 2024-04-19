// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::net::IpAddr;

use local_ip_address::local_ip;

#[tauri::command]
fn get_user_ip() -> IpAddr {
    let my_local_ip = local_ip().unwrap();
    println!("This is my local IP address: {:?}", my_local_ip);
    return  my_local_ip.into();
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_user_ip])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
