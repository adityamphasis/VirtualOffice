package com.bhartiaxa.virtualoffice;

import android.content.ContentValues;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.util.Log;
import android.widget.Toast;


// https://facebook.github.io/react-native/

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;


public class HelloWorldModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;

    HelloWorldModule(ReactApplicationContext context){
        super(context);
        reactContext = context;
    }

    @Override
    public String getName(){
        return "HelloWorldModule";
    }

    @ReactMethod
    public void ShowMessage(String message,String isSales, int duration){
        Log.d("HELLO_WORLD_MODULE", message);

       // Toast.makeText(reactContext, ""+message, Toast.LENGTH_SHORT).show();
        SQLiteDatabase db = new DatabaseProvider.DatabaseHelper(getReactApplicationContext()).getReadableDatabase();
        Cursor cursor = db.rawQuery("SELECT * from " + DatabaseProvider.TOKEN_TABLE, null);
        if (cursor.moveToFirst()) {
            db.delete(DatabaseProvider.TOKEN_TABLE, null, null);
        }
        cursor.close();
        String token = message;
        ContentValues values = new ContentValues();
        values.put("tokenId", 1);
        values.put("token", token);
        values.put("isSales",isSales);
        db.insert(DatabaseProvider.TOKEN_TABLE, "", values);

    }
}
