/*
*	一个基于zeptoJS的移动端图片延迟加载插件
*	demo: 
*	
*	<body>
*		<div class="">
*			<img data-url="http://www.baokuandaren.com" data-alt="爆款达人" class="imglazyload" />
*	 	</div>
*	 	<div class="">
*			<img data-url="http://www.baokuandaren.com" data-alt="爆款达人" class="imglazyload" />
*	 	</div>
*	 	<div class="">
*			<img data-url="http://www.baokuandaren.com" data-alt="爆款达人" class="imglazyload" />
*	 	</div>
*	 	<div class="">
*			<img data-url="http://www.baokuandaren.com" data-alt="爆款达人" class="imglazyload" />
*	 	</div>
*	</body>
*
* 	// 插件调用
* 	<script type="text/javascript" src="http://www.baokuandaren.com/js/zepto.min.js"></script>
*  	<script type="text/javascript">
*  		// 不带参将不存在背景占位图;及只有当图片位于视口区域才会被加载;
*  		$(".imglazyload").imglazyload();
*
* 		// 可以带两个参数
*  		$(".imglazyload").imglazyload({
*
* 			// 表示背景展位图
*  			backgroundImg : "http://www.baokuandaren.com/images/img-placeHolder.png",
*  			
*  			// 距离视口多远的距离时可以提前加载
*  			distance: "50"
*  		});
*  	</script>
*/ 

;(function(){

	$.fn.imglazyload = function (options) {

		var $this = $(this);

		options = options || {};

		// 为图片添加一个未加载之前的占位背景图
		var addImgBg = function () {

			var imgBackground = options.backgroundImg;

			if(imgBackground) {
				$this.parent().css({
					backgroundImage: "url("+ imgBackground +")",
					backgroundSize: "cover"
				});
			}
		};
		addImgBg();

		// 顶部是否可加载
		var _top = function (element) {

			var _imgTop,
				// winHeight: 获取屏幕高度;
				winHeight = $(window).height(),

				// scrollHeight: 获取滑动的距离;
				scrollHeight = $(window).scrollTop(),
				
				// longHeight: 获取提前加载的距离;
				longHeight = options.distance;

			// 距头部可加载图片的高度;
			_imgTop = longHeight ? winHeight + scrollHeight + longHeight : winHeight + scrollHeight;

			// 判断元素是否处于图片应加载区域;
			return _imgTop >= element.offset().top ? true : false;
		};

		// 底部是否可加载
		var _bottom = function (element) {

			var scrollHeight = $(window).scrollTop();

			return scrollHeight <= element.offset().top + element.height() ? true : false;
		};

		// 判断是否满足上下都能加载的条件
		var inViewport = function (element) {

			return _top(element) && _bottom(element) ? true : false;
		};

		var imgLoad = function () {


			$this.each(function() {

				var then = this;

				if(then.src == ""){

					if(inViewport($(then))) {
						// strSrc: 获取图片的路径
						// strAlt: 获取图片描述文字;
						var strSrc = $(then).attr("data-url"),
							strAlt = $(then).attr("data-alt");

						$(then).attr({
							src: strSrc,
							alt: strAlt
						}).removeAttr("data-url").removeAttr("data-alt");
					}
				}
			});
		};

		// 绑定load事件
		window.addEventListener("load", imgLoad, false);

		// 绑定滚动事件
		window.addEventListener("scroll", imgLoad, false);
	};

})(Zepto);