new Vue({
	el: '#video',
	data: {
		videoData: [],
		sinput: "",
		dataJson: [],
		descs: "",
		title: "",
		flag: false,
		videoCore: "",
		image: "",
		service: "119.23.71.240",
		src: ""
	},
	created() {
		console.log("开心的一天从现在开始，天天开心");
		var videoId = window.sessionStorage.getItem("videoId");
		var jsonArr = [];
		var json = this.urlGet(videoId).then(res => {
			console.log(res);
			if (res.msg == 200) {
				var json = JSON.parse(res.data).root.results;

				this.videoData = json.fields.video_ids;
				// console.log(json);
				// console.log(json.root.results.id);
				this.videoCore = json.id;
				this.getDesc();
				// console.log(this.videoCore);
				this.videoData = JSON.parse(json.fields.vip_ids);
				// console.log(JSON.parse(json.fields.nomal_ids));
				this.title = json.fields.title;
				this.image = json.fields.new_pic_hz;
				this.setLoad(1);
			}
		})
		// this.videoData = jsonArr;
		

	},
	methods: {
		urlGet: async function(videoId) {
			var res = await fetch('http://'+this.service+':8080/video/v1/getVideoData?videoId=' + videoId);
			var json = await res.json();
			return json;
		},
		setVideoUrl:async function(url, e) {
			this.$refs.img.style.display = "none";
			this.setLoad(0);
			console.log("id="+url);
			var res = await fetch('http://'+this.service+':8080/video/v1/getVideoDesc?cId=' + url);
			var json = await res.json();
			// console.log(json);
			if(json.data != "{}"){
				// console.log(JSON.parse(json.data).root.results.fields.title);
				alert("正在为您打开---->"+JSON.parse(json.data).root.results.fields.title);
			}
			var res = await fetch('http://'+this.service+':8080/video/v1/getGather?videoUrl=https://v.qq.com/x/cover/'+this.videoCore +'/'+url+'.html');
			var json = await res.json();
			console.log(json.data);
			if(json.data.msg == 200){
				this.src = json.data.url;
				// location.href = json.data.url;
			}else{
				alert("加载失败请重新点击加载！！！")
			}
			this.setLoad(1);
		},
		getDesc: async function() {
			var res = await fetch(
				'https://access.video.qq.com/pc_client/detail_intro?vappid=63524327&vsecret=03f74e77d53288bc0562697162d1642288fa11c7976c5859&vversion_name=5.4.0.1236&vplatform=1&g_tk=&g_vstk=1649211124&g_actk=592553318&cid=' +
				this.videoCore + '&raw=1');
			var json = await res.json();
			// console.log(json);
			// console.log(json.data.intro.plot);
			this.descs = json.data.intro.plot;
		},
		back: function() {
			location.href = "index.html";
		},
		setClass: function(count) {
			if (count == 0) {
				return 'checked';
			}
			return '';
		},setLoad(code){
			if(code == 1){
				this.$refs.load.style.display = "none";
			}else{
				this.$refs.load.style.display = "block";
			}
		}
	}
});
