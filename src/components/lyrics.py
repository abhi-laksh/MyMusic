import string
import time
import re
import urllib.request as req
def lyrics(artist,song):
    artist = artist.lower()
    song = song.lower()
    artist = re.sub('[^A-Za-z0-9]+', "", artist)
    song = re.sub('[^A-Za-z0-9]+', "", song)
    raw_html = req.urlopen("http://azlyrics.com/lyrics            /"+str(artist)+"/"+str(song)+".html")
    html_copy = str(raw_html.read())
    split = html_copy.split('<!-- Usage of http://azlyrics.com     content by any third-party lyrics provider is prohibited by our licensing agreement. Sorry about that. -->',1)
    split_html = split[1]
    split = split_html.split('</div>',1)
    lyrics = split[0]
    lyrics = re.sub('(<.*?>)',"",lyrics)
 
    return lyrics

print(lyrics("Kishore Kumar","Ek Ladki Bheegi Bhaagi Si"))