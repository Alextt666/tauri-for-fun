// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}
#[tauri::command]
fn increse(num: i32) -> i32 {
    num + 1
}

#[tauri::command]
fn set_net_config(net_config: String) {
    println!("I was invoked from JS! The argument is {}", net_config);
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, increse,set_net_config])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
