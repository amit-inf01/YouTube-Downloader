const express = require("express");
const ytdl = require("ytdl-core");
const app = express();
app.use(express.json());
app.use(express.static("public"));
app.get("/",function(request,response){
	response.sendFile(__dirname + "public/index.html");
});
app.get("/youtube-video-downloader/",function(request,response){
	response.sendFile(__dirname + "/public/youtubevideodownloader.html");
});
app.get("/youtube-to-mp3/",function(request,response){
	response.sendFile(__dirname + "/public/youtubetomp3.html");
});
app.get("/youtube-to-mp4/",function(request,response){
	response.sendFile(__dirname + "/public/youtubetomp4.html");
});
app.get("/f.a.q./",function(request,response){
	response.sendFile(__dirname + "/public/faq.html");
});
app.get("/features/",function(request,response){
	response.sendFile(__dirname + "/public/features.html");
});
app.get("/contact/",function(request,response){
	response.sendFile(__dirname + "/public/contact.html");
});
app.get("/privacy%20policy/",function(request,response){
	response.sendFile(__dirname + "/public/privacy.html");
});
app.get("/terms%20of%20service/",function(request,response){
	response.sendFile(__dirname + "/public/terms.html");
});

app.get("/videoInfo/",async function(request,response){
	const videoURL = request.query.videoURL;
	try{
        const info = await ytdl.getInfo(videoURL);
        response.status(200).json(info);
    }catch(err){
        console.log(err);
    }
});
app.get("/download/",function(request,response){
	const videoURL = request.query.videoURL;
	const itag = request.query.itag;
	const fileName =
	response.header("Content-Disposition",'attachment;\ filename="video.mp4"');
	ytdl(videoURL,{
		filter: format => format.itag == itag
	}).pipe(response);
});
app.listen(3000,function(){
	console.log("server at 3000");
});
