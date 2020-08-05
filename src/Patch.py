from pathlib import Path
from glob import glob
import os
import re
import shutil

#list of file and folders which are exempted from cache
CacheIgnoreItms=["src","otherhtml","oldjb"]
CacheAllowedFileType=["js","html"]

# jb code file
JbFile="jb/c-code.js"

#Initial page
index="index.html"

#payloads Files Folder
payloadFolder="payloads"

#Adding Mira and Mira No HB to Payloads
payloadJsArray= ["mira/mira2.js","mira/mira2-nohb.js"] #remaning payload in Payload folder will be added during execution, as this code also move other js files

#the HTML with we need 
requiredHtmls=["index.html"]

#place to move other HTML file
otherhtmlFolder="otherhtml"

#javaScript which need for injection of payloads
ScriptLoaderTxt="""<!-- script loader -->
	<script>
    	function jb_finished(){
        	if(main_ret == 179 || main_ret == 0)
        	{
            	alert("You're all set!");
            	read_ptr_at(0);
        	}
        	else{
            	alert("Jailbreak failed! Reboot your PS4 and try again.");
            }
    	}
    	function load_finished(payload){
        	if(payload.indexOf('linux')==-1){
            	alert("You're all set!");
        	}else{
            	alert("An error occurred! - Check the popup for details.");
        	}
        	
        	read_ptr_at(0);
    	}
    	function SC(x){
        	return '<script src="'+x+'.js"></scr'+'ipt>';
    	}
    	function COMMON(x){
        	return SC('common/'+x);
    	}
    	function JB(x){
        	return SC('jb/'+x);
    	}
    	function MIRA(x){
        	return SC('mira/'+x);
    	}
    	function PAYLOADS(x){
        	return SC('payloads/'+x);
    	}
    	var commons = COMMON('exploit')+COMMON('helpers')+COMMON('malloc')+COMMON('rop')+COMMON('syscalls')+COMMON('syscalls2');
    	function load_jb(){
        	setTimeout(function(){document.write(commons+JB('c-code')+'<script>jb_finished();</scr'+'ipt>');}, 500);
    	}
    	function load_payload(payload){
    		document.cookie = 'kex=3';
        	if (payload!='') {
            	if (payload.indexOf('mira')!=-1){
                	setTimeout(function(){document.write(commons+MIRA('mira')+MIRA(payload)+MIRA('c-code')+'<script>load_finished(\\''+payload+'\\');</scr'+'ipt>');}, 500);
            	}else{
                	setTimeout(function(){document.write(commons+MIRA('mira')+PAYLOADS(payload)+MIRA('c-code')+'<script>load_finished(\\''+payload+'\\');</scr'+'ipt>');}, 500);
            	}
        	}else{
            	setTimeout(function(){document.write(commons+MIRA('mira')+MIRA('c-code')+'<script>load_finished(\\''+payload+'\\');</scr'+'ipt>');}, 500);
        	}
    	}
	</script>
	<!-- end of script loader -->"""

#CSS button Styles 
ButtonStyleTxt="""<!-- button style -->
<style>
.buttonLink {
  background-color: #11365e;  
  border-radius: 5px;
  color: white;
  display:inline-table;
  height:20%;
}

.buttonLink:hover {
  background-color: #0c7cf5;
}
</style>
<!-- end of button style -->"""
							
#function to create cache manifest file
def createManiFest():
        ManifestTxt="CACHE MANIFEST\n"
        ManifestTxt+='# random: '+os.urandom(16).hex()+'\n' # tell the browser to refresh
        ManifestTxt+="\n"+"CACHE:"
        cacheArray=[]
        
        #iterating thorugh base folder to list out all the files
        for itm in glob("*"):
                if itm in CacheIgnoreItms:
                        #if the item is present in ignore list it will continue without adding
                        continue
                #check if its a file or folder
                if os.path.isfile(itm) and itm.split('.')[-1] in CacheAllowedFileType:
                        #if file add it to cache array
                        cacheArray.append(os.path.basename(itm))
                else:
                        #if folder recursively find files in it
                        for path in Path('').rglob('{}/*'.format(itm)):
                        	if str(path).split('.')[-1] in CacheAllowedFileType:
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
        
def updateIndexCss():
	indexTxt=open(index).read().strip()
	#check if Script loader is Present if not append it below the body tag, else replace the block
	if indexTxt.count("<!-- script loader -->")<=0:
		indexTxt=indexTxt.replace('<body>',"<body>\n{}".format(ScriptLoaderTxt))
	else:
		indexTxt = re.sub(r"<!-- script loader -->.*?-->", ScriptLoaderTxt,indexTxt,flags=re.S)	
				
	#check if button Style css is  present if not append it below html tag, else replace the block
	if indexTxt.count("<!-- button style -->")<=0:
		indexTxt=indexTxt.replace('<html manifest="Cache.manifest">','<html manifest="Cache.manifest">\n{}'.format(ButtonStyleTxt))
	else:
		indexTxt = re.sub(r"<!-- button style -->.*?-->", ButtonStyleTxt, indexTxt,flags=re.S)
	
	open(index,'w').write(indexTxt)
  
def moveJsBinToPayload():
	if not os.path.isdir(payloadFolder):
		try:
			os.mkdir(payloadFolder)
		except Exception as e:
			raise
	
	#find all js and bin file from root folder and move to payload folder
	for fls in glob('*'):
		if fls.endswith(".js") or fls.endswith(".bin"):
			shutil.move(fls,"{}/{}".format(payloadFolder,os.path.basename(fls)))

def updateIndexWithPayloads():
	#geting the List of files in payloadFolder
	payloadFolderArray=glob('{}/*.js'.format(payloadFolder))
	payloadFolderArray.sort()
	
	#HTML code which triggers the payload
	payloadButtonTxt="<!-- payload loader -->"
	payloadButtonTxt+='\n'+'<table align="center" style="width:800px;margin-top:30px;table-layout: fixed;"  cellpadding = "5" cellspacing = "5">'
	payloadButtonTxt+='\n'+'<tr>'

	#leaving the jb.html as its
	payloadButtonTxt+='\n'+'<td colspan="{}" align="center"><a href="#" class="buttonLink" onclick="load_jb(); return false" style="width:100%;height:100%" >JB</a></td>'.format(len(payloadJsArray)+len(payloadFolderArray)+1)
	payloadButtonTxt+='\n'+'</tr>'
	payloadButtonTxt+='\n'+'<tr>'
	
	#looping through payloadJsArray and payload folder to create triggers for each JS payload
	for fls in payloadJsArray+payloadFolderArray:
		payloadButtonTxt+="\n"+'<td  align="center"><a href="#" class="buttonLink" onclick="load_payload(\'{}\'); return false"  style="width:100%;height:100%" >{}</a></td>'.format(".".join(os.path.basename(fls).split('.')[:-1]),os.path.basename(fls).split(".")[0].upper())
	payloadButtonTxt+="\n"+'<td  align="center"><a href="#" class="buttonLink" onclick="load_payload(\'\'); return false"  style="width:100%;height:100%" >{}</a></td>'.format("NETCAT")
	payloadButtonTxt+="\n"+"<!--End of payload loader -->"
	payloadButtonTxt+='\n'+'</tr>'
	payloadButtonTxt+='\n'+'</table>'

	indexTxt=open(index).read().strip()
	#checking if we already hav payload loader segment if no replace </body> with new button text, else replace the block
	if indexTxt.count("<!-- payload loader -->")<=0:
		newIndexTxt=""
		for ln in indexTxt.split("\n"):
			if len(re.findall('<a href=.*?.html',ln))>0:
				continue
			newIndexTxt+="\n"+ln
		newIndexTxt=newIndexTxt.replace("</body>","{}\n</body>".format(payloadButtonTxt))
	else:
		newIndexTxt = re.sub(r"<!-- payload loader -->.*?-->", payloadButtonTxt, indexTxt,flags=re.S)
	open(index,'w').write(newIndexTxt)

def moveRemainingHtmls():
	if not os.path.isdir(otherhtmlFolder):
		try:
			os.mkdir(otherhtmlFolder)
		except Exception as e:
			raise
			
	for fls in glob('*.html'):
		#move the remaining html to other html folder
		if os.path.basename(fls) not in requiredHtmls:
			shutil.move(fls,"{}/{}".format(otherhtmlFolder,os.path.basename(fls)))
	

trimCCodeJs()
updateIndexCss()
moveJsBinToPayload()
updateIndexWithPayloads()
moveRemainingHtmls()
createManiFest()
