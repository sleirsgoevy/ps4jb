from pathlib import Path
from glob import glob
import os

#list of file and folders which are exempted from cache
ignoreItms=["src","README.md","Cache.manifest","Patch.py"]

# jb code file
JbFile="jb/c-code.js"

#Initial page
index="index.html"

#function to create cache manifest file
def createManiFest():
        ManifestTxt="CACHE MANIFEST\n"
        ManifestTxt+='# random: '+os.urandom(16).hex()+'\n' # tell the browser to refresh
        ManifestTxt+="\n"+"CACHE:"
        cacheArray=[]
        
        #iterating thorugh base folder to list out all the files
        for itm in glob("*"):
                
                if itm in ignoreItms:
                        #if the item is present in ignore list it will continue without adding
                        continue
                #check if its a file or folder
                if os.path.isfile(itm):
                        #if file add it to cache array
                        cacheArray.append(os.path.basename(itm))
                else:
                        #if folder recursively find files in it
                        for path in Path('').rglob('{}/*'.format(itm)):
                                cacheArray.append(str(path))

        # sort the array to make the file look nice
        cacheArray.sort()
        ManifestTxt+="\n"+"\n".join(cacheArray)
        ManifestTxt+="\n\n"+"NETWORK:"
        ManifestTxt+="\n"+"*"
        open('Cache.manifest','w').write(ManifestTxt)

def trimCCodeJs():
        newTxt=""
        #loop through all the line of code js
        for ln in open(JbFile).read().split('\n'):
                ln = ln.split('//', 1)[0].strip()
                if ln: newTxt += ln+'\n'
        open(JbFile,'w').write(newTxt.strip())
        
def updateIndex():
        indexTxt=open(index).read().strip()
        # replace the html tag with html manifest tag, if html tage already has manifest it wont be added
        indexTxt=indexTxt.replace('<html>','<html manifest="Cache.manifest">')
        
        #check if html already have cach instructions, if not add it
        if indexTxt.count("window.applicationCache.ondownloading")<=0:
                CacheScriptTxt="""<body>
<script>window.applicationCache.ondownloading=function(){alert("Caching started !!")};window.applicationCache.onprogress=function(a){document.getElementById("progress").innerHTML="<h3'>Caching Status: "+(Math.round(100*(a.loaded/a.total)))+"% Completed</h3>"};window.applicationCache.oncached=function(){alert("Page Cached!!")};</script>"""
        
                indexTxt=indexTxt.replace('<body>',CacheScriptTxt)
        open(index,'w').write(indexTxt)
                
createManiFest()
trimCCodeJs()
updateIndex()
