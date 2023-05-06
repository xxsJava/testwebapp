var vm = new Vue({
	el: '#app',
	vuetify: new Vuetify(),
	data: {
		videoData: [],
		drawer: null,
		sinput: "",
		dataJson: [],
		vidoDesc: [],
		service: "119.23.71.240",
		items: [{
				src: 'http://puui.qpic.cn/vcover_hz_pic/0/mzc00200xf3rir61659936008457/0',
			},
			{
				src: 'http://puui.qpic.cn/vcover_hz_pic/0/m441e3rjq9kwpsc1677852924878/0',
			},
			{
				src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
			},
			{
				src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
			},
		],
		chs: [{
				title: 'xxs',
				icon: 'dashboard'
			},
			{
				title: 'xxs',
				icon: 'question_answer'
			},
		],
		icons: {
			iconfont: 'mdi', // default - only for display purposes
		},
		color: "#FFF",
		drawer: false
	},
	created() {

		// var videoId = this.$refs.video;
		var strArr = [];
		//初始化
		var json = this.getIds("斗罗大陆").then(res => {
			// console.log(res);
			res.data.forEach(function(v, i) {
				// console.log(JSON.parse(v).root.results);
				var json = JSON.parse(v).root.results.fields;
				// console.log(json);
				strArr.push(json);
			})

			this.setLoad(1);
		});

		this.videoData = strArr;

		console.log(this.videoData);

	},
	methods: {
		clikS: function() {
			var sinput = this.$refs.sinput;
			if (sinput.querySelector("p").style.display != "none") {
				sinput.querySelector("p").style.display = "none";
				sinput.querySelector("input").style.display = "block";
			} else {
				sinput.querySelector("p").style.display = "block";
				sinput.querySelector("input").style.display = "none";
			}
		},
		clikCH: function(e) {
			var ch = this.$refs.ch;
			var logo = this.$refs.logo.querySelector("img");
			if (ch.style.display == "none") {
				ch.style.display = "none";
			} else {
				ch.style.display = "block";
				logo.style.display = "none";
			}
		},
		getIds: async function(videoName) {
			const res = await fetch('http://' + this.service + ':8080//video/v1/getVideoId?videoName=' +
				videoName);
			const json = await res.json();
			return json;
		},
		submit: function() {
			this.setLoad(0);
			var strArr = [];
			var json = this.getIds(this.sinput).then(res => {
				console.log(res);
				res.data.forEach(function(v, i) {
					// console.log(JSON.parse(v).root.results);
					var json = JSON.parse(v).root.results.fields;
					strArr.push(json);
				})
				this.setLoad(1);
			});
			this.videoData = strArr;

		},
		setSession: function(videoId) {
			// 保存
			window.sessionStorage.setItem('videoId', videoId);
			console.log("存入id存入session");
		},
		getDesc: function(cid) {
			axios.get(
					'https://access.video.qq.com/pc_client/detail_intro?vappid=63524327&vsecret=03f74e77d53288bc0562697162d1642288fa11c7976c5859&vversion_name=5.4.0.1236&vplatform=1&g_tk=&g_vstk=1649211124&g_actk=592553318&cid=' +
					cid + '&raw=1')
				.then(function(response) {
					console.log(response);
					return response;
				})
				.catch(function(error) {
					console.log(error);
				})
		},
		setLoad(code) {
			if (code == 1) {
				this.$refs.load.style.display = "none";
			} else {
				this.$refs.load.style.display = "block";
			}
		}
	}
});
