//
//  data.swift
//  virtualoffice
//
//  Created by Aditya on 19/03/21.
//

import Foundation
import Security

@objc(data) class data: NSObject {
  @objc static func requiresMainQueueSetup() -> Bool {return true}
  
 // @objc static var isOn = false
  
//  @objc func turnOn() {
//    data.isOn = true
//  }
//  @objc func turnOff() {
//    data.isOn = false
//  }
   @objc func saveToken() {
        // self.save(passwordKey, data: token)
    print("data from react natiev")
     }
  @objc func saveSales() {
        // self.save(passwordKey, data: token)
     }
  
  
  @objc func getdataStatus(_ callback: RCTResponseSenderBlock) {
    callback([NSNull(), data.self])
  }
}
