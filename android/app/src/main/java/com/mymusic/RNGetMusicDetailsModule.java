package com.mymusic;

import android.annotation.TargetApi;
import android.media.MediaMetadataRetriever;
import android.net.Uri;
import android.util.Base64;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;

public class RNGetMusicDetailsModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;
    private static  final String NOT_FOUND_ERROR = "NOT_FOUND";
    private static  final String UNKNOWN = "Unknown";



    RNGetMusicDetailsModule(ReactApplicationContext context){
        super(context);
        reactContext = context;
    }

    // To access this class in JS with this name as module.
    @Override
    public String getName(){
        return "RNGetMusicDetails";
    }

    @TargetApi(16)
    @ReactMethod
    public void getMetadata(String uri , Promise promise){
        WritableMap map = Arguments.createMap();
        MediaMetadataRetriever MMR = new MediaMetadataRetriever();
        try{
            MMR.setDataSource(getReactApplicationContext(), Uri.parse(uri));

            byte[] rawArt;
            String cover;

            rawArt = MMR.getEmbeddedPicture();
            if(rawArt != null){
                cover = Base64.encodeToString(rawArt,Base64.DEFAULT);
            }else{
                cover = null;
            }

            String title = MMR.extractMetadata(MediaMetadataRetriever.METADATA_KEY_TITLE);
            String album = MMR.extractMetadata(MediaMetadataRetriever.METADATA_KEY_ALBUM);
            String duration = MMR.extractMetadata(MediaMetadataRetriever.METADATA_KEY_DURATION);
            String artist = MMR.extractMetadata(MediaMetadataRetriever.METADATA_KEY_ARTIST);
            String genre = MMR.extractMetadata(MediaMetadataRetriever.METADATA_KEY_GENRE);

            if(title == null){ title = uri.substring(uri.lastIndexOf("/")+1); }
            if(album == null) { album = UNKNOWN + " Album"; }
            if(artist == null) { artist = UNKNOWN + " Artist"; }
            if(genre == null) { genre = UNKNOWN + " Genre"; }

            map.putString("title", title);
            map.putString("album", album);
            map.putString("artist", artist);
            map.putString("duration", duration);
            map.putString("genre", genre);
            map.putString("cover", cover);

            promise.resolve(map);

        }catch (Exception e){
            promise.reject(NOT_FOUND_ERROR,e);
        }finally {
            MMR.release();
        }
    }
}
