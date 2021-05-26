package com.bhartiaxa.virtualoffice;

import android.content.ContentProvider;
import android.content.ContentUris;
import android.content.ContentValues;
import android.content.Context;
import android.content.UriMatcher;
import android.database.Cursor;
import android.database.SQLException;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.database.sqlite.SQLiteQueryBuilder;
import android.net.Uri;
import android.text.TextUtils;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import java.util.HashMap;

public class DatabaseProvider extends ContentProvider {
    static final String PROVIDER_NAME = "com.bhartiaxa.virtualoffice.DatabaseProvider";
    static final String URL = "content://" + PROVIDER_NAME + "/tokenTable";
    static final Uri CONTENT_URI = Uri.parse(URL);

    private static HashMap<String, String> STUDENTS_PROJECTION_MAP;

    static final int TOKEN = 1;
    static final int TOKEN_ID = 2;
    static final String DATABASE_NAME = "appDB";
    static final String TOKEN_TABLE = "tokenTable";
    static final UriMatcher uriMatcher;

    static {
        uriMatcher = new UriMatcher(UriMatcher.NO_MATCH);
        uriMatcher.addURI(PROVIDER_NAME, TOKEN_TABLE, TOKEN);
        uriMatcher.addURI(PROVIDER_NAME, TOKEN_TABLE + "/#", TOKEN_ID);
    }

    private SQLiteDatabase db;

    static final int DATABASE_VERSION = 1;
    static final String CREATE_DB_TABLE =
            "CREATE TABLE IF NOT EXISTS " + TOKEN_TABLE + " (tokenId INTEGER PRIMARY KEY AUTOINCREMENT, " + "token TEXT NOT NULL, isSales TEXT NOT NULL);";

    public static class DatabaseHelper extends SQLiteOpenHelper {
        DatabaseHelper(Context context) {
            super(context, DATABASE_NAME, null, DATABASE_VERSION);
        }

        @Override
        public void onCreate(SQLiteDatabase db) {
            db.execSQL(CREATE_DB_TABLE);
        }

        @Override
        public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
            db.execSQL("DROP TABLE IF EXISTS " + TOKEN_TABLE);
            onCreate(db);
        }
    }

    @Override
    public boolean onCreate() {
        Context context = getContext();
        DatabaseHelper dbHelper = new DatabaseHelper(context);
        db = dbHelper.getWritableDatabase();
        return db != null;
    }

    @Override
    public Uri insert(Uri uri, ContentValues values) {
        long rowID = db.insert(TOKEN_TABLE, "", values);
        if (rowID > 0) {
            Uri _uri = ContentUris.withAppendedId(CONTENT_URI, rowID);
            getContext().getContentResolver().notifyChange(_uri, null);
            return _uri;
        }
        throw new SQLException("Failed to add a record into " + uri);
    }

    @Override
    public Cursor query(Uri uri, String[] projection,
                        String selection, String[] selectionArgs, String sortOrder) {
        SQLiteQueryBuilder qb = new SQLiteQueryBuilder();
        qb.setTables(TOKEN_TABLE);

        switch (uriMatcher.match(uri)) {
            case TOKEN:
                qb.setProjectionMap(STUDENTS_PROJECTION_MAP);
                break;

            case TOKEN_ID:
                qb.appendWhere("tokenId" + "=" + uri.getPathSegments().get(1));
                break;

            default:
        }

        if (sortOrder == null || sortOrder == "") {
            sortOrder = "tokenId";
        }

        Cursor c = qb.query(db, projection, selection,
                selectionArgs, null, null, sortOrder);
        c.setNotificationUri(getContext().getContentResolver(), uri);
        return c;
    }

    @Override
    public int delete(Uri uri, String selection, String[] selectionArgs) {
        int count = 0;
        switch (uriMatcher.match(uri)) {
            case TOKEN:
                count = db.delete(TOKEN_TABLE, selection, selectionArgs);
                break;

            case TOKEN_ID:
                String id = uri.getPathSegments().get(1);
                count = db.delete(TOKEN_TABLE, "tokenId = " + id +
                        (!TextUtils.isEmpty(selection) ? " AND (" + selection + ')' : ""), selectionArgs);
                break;
            default:
                throw new IllegalArgumentException("Unknown URI " + uri);
        }

        getContext().getContentResolver().notifyChange(uri, null);
        return count;
    }

    @Override
    public int update(@NonNull Uri uri, @Nullable ContentValues contentValues, @Nullable String s, @Nullable String[] strings) {
        return 0;
    }

    @Override
    public String getType(Uri uri) {
        switch (uriMatcher.match(uri)) {
            /**
             * Get all student records
             */
            case TOKEN:
                return "vnd.android.cursor.dir/vnd.example.students";
            /**
             * Get a particular student
             */
            case TOKEN_ID:
                return "vnd.android.cursor.item/vnd.example.students";
            default:
                throw new IllegalArgumentException("Unsupported URI: " + uri);
        }
    }
}