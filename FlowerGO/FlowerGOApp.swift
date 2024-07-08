//
//  FlowerGOApp.swift
//  FlowerGO
//
//  Created by Peigen Yuan on 7/8/24.
//

import SwiftUI

@main
struct FlowerGOApp: App {
    let persistenceController = PersistenceController.shared

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(\.managedObjectContext, persistenceController.container.viewContext)
        }
    }
}
