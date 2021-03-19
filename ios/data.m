//
//  data.m
//  virtualoffice
//
//  Created by Aditya on 19/03/21.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"
@interface RCT_EXTERN_MODULE(data,NSObject)
RCT_EXTERN_METHOD(saveSales)
RCT_EXTERN_METHOD(saveToken)
RCT_EXTERN_METHOD(getdataStatus: (RCTResponseSenderBlock)callback)
@end
