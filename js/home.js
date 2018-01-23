function tab(obj){
        var target = document.getElementById(obj);
		var newst=target.children[0];
		//获取新闻  和  公告
        var spans = newst.getElementsByTagName("span");
        var newsB=document.getElementById("newsB");
        var uls = newsB.getElementsByTagName("ul");
        for(var i=0;i<spans.length;i++)
        {
            spans[i].onmouseover =  function (num) {//一经过就立即执行
                return function(){
                    for(var j=0; j<spans.length;j++)
                    {
                        spans[j].className = "";
                        uls[j].className = "";
                    }
                    spans[num].className = "current";
                    uls[num].className = "show";
                }
            }(i);
        }
    }
window.onload=function(){
//	弹出层关闭  消失
	var close=document.getElementById("close");
	var upDiv=document.getElementById("upDiv");
	close.onclick=function(){
		upDiv.style.display="none";
	}
//	<!--联系我们  和登录js-->
	var navTop=document.getElementById("navTop");
	var two=navTop.getElementsByTagName("li");
	var login=two[0];//登录
	var callUs=two[1];//联系我们
	//联系我们图标
	var callPic=document.getElementById("callPic");
	//点击联系我们
	callUs.onclick=function(){
		if(callPic.style.display=="none"){
			callPic.style.display="block";
		}
		else{
			callPic.style.display="none";
		}
	}
	//点击登录出来弹出层
	login.onclick=function(){
		var upDiv=document.getElementById("upDiv");
		upDiv.style.display="block";
	}			
	
//	<!--标题导航js-->
	function List(id) {  //  获取对象
		this.id = document.getElementById(id);  // 取 id 值
		this.lis = this.id.children[0].children;  // 获取一级菜单所有的li
	}
	// init 初始化
	List.prototype.init = function() {  
		var that  = this;// 遍历所有的li 显示和隐藏
		for(var i=0;i<this.lis.length;i++)
		{
			this.lis[i].index = i;
			this.lis[i].onmouseover = function() {
				that.show(this.children[0]);  //  显示出来
			}
			this.lis[i].onmouseout = function() {
				that.hide(this.children[0]);  // 隐藏起来
			}
		}
	}
	List.prototype.show = function(obj) {
		obj.style.display = "block";
	}
	List.prototype.hide = function(obj) {
		obj.style.display = "none";
	}
	var list = new List("list");  // 实例化了一个对象 叫  list
	list.init();
	//标题导航结束
	
//	<!--新闻和公告tab栏切换-->		
   	tab("news");
	
	//轮播图
    function $(id) {return document.getElementById(id);}
    var js_slider = $("js_slider");  // 获取最大盒子
    var slider_main_block = $("slider_main_block");  // 滚动图片的父亲
    var imgs = slider_main_block.children;  // 获得所有的图片组 需要滚动的部分
    var slider_ctrl = $("slider_ctrl");  // 获得 控制span 的 父盒子
    // 操作元素
    // 生成小span
    for(var i=0;i<imgs.length; i++) {

        var span = document.createElement("span");// 创建 span
        span.className = "slider-ctrl-con"; // 添加类名
        span.innerHTML = imgs.length-i;  //  6 - 0     6 - 1   // 实现 倒序 的方式插入
        slider_ctrl.insertBefore(span,slider_ctrl.children[1]);  // 再 父亲 倒数第二个盒子的前面插入
    }
    // 下面的第一个小span  是默认的蓝色
    var spans = slider_ctrl.children;   // 得到所有的 span
    spans[1].setAttribute("class","slider-ctrl-con current");  // 两个类名

    var scrollWidth = js_slider.clientWidth; // 得到大盒子的宽度 也就是  后面动画走的距离  310
    //  刚开始，按道理   第一张图片 留下   其余的人走到 310 的位置上
    for(var i = 1; i<imgs.length; i++) { // 从1 开始 因为第一张不需要计算

        imgs[i].style.left =  scrollWidth + "px";  // 其他人 先右移动到 310 的位置
    }
    // 遍历三个按钮
     // spans 是 8个按钮 他们都是 span
    var iNow = 0; //  用来 控制播放张数  （第几张）
    for(var k in spans){   //   k  是索引号  spans[k]    spans[0]  第一个span
        spans[k].onclick = function() {
            if(this.className == "slider-ctrl-prev"){ // 判断当前点击的这个按钮是不是 prev
                //  当我们左侧点击时候， 当前的这张图片 先慢慢的走到右边  上一张 一定先快速走到左侧 （-310）的位置，然后慢慢的走到舞台中
                animate(imgs[iNow],{left: scrollWidth});
                --iNow < 0 ?  iNow = imgs.length - 1 : iNow;
                imgs[iNow].style.left = -scrollWidth + "px";
                animate(imgs[iNow],{left: 0});
                setSquare();
            }
            else if(this.className == "slider-ctrl-next") {  // 右侧按钮开始
                autoplay();
            }
            else {
                // 我们首先要知道我们点击是第几张图片  --- 获得当前的索引号
                var that = this.innerHTML - 1;//字符型（但是字符型-1就是数值型）
                // console.log(typeof that);  测试一下that的类型
                if(that > iNow) {//点击的小span大于当前的  应该把当前的图从左面出去 从右面出来点击的图
                      // 做法等同于 右侧按钮
                    animate(imgs[iNow],{left: -scrollWidth});  // 当前的这张慢慢的走出去 左侧
                    imgs[that].style.left = scrollWidth + "px"; // 点击的那个索引号 快速走到右侧  310
//              	animate(imgs[that],{left: 0});
                }
                else if(that < iNow) {
                    // 做法等同于 左侧按钮
                    //当前的慢慢走到右侧   点击的那一张快速走到左边 然后慢慢向左侧走（显示的位置）
                    animate(imgs[iNow],{left: scrollWidth});
                    imgs[that].style.left = -scrollWidth + "px";
//              	animate(imgs[that],{left: 0});
                }
                  //点击的刚好是当前的小spans
                iNow = that;  // 给当前的索引号  
                //当前是第四张  我点击了第二张  下一张从第三张开始播放
                animate(imgs[iNow],{left: 0});
                setSquare();
            }
        }
    }
    //  一个可以控制 播放span 的 函数   当前
    function setSquare() {
       //  清除所有的span current   留下 满足需要的拿一个
        for(var i=1;i<spans.length-1;i++){   //  8个span   我们要 1-6  不要 7  索引号
        	//只遍历下面的小span  不要左右箭头
            spans[i].className = "slider-ctrl-con";
        }
        spans[iNow+1].className = "slider-ctrl-con current";  // 记住 + 1
        //iNOw+1  inow从0开始
    }
    
    // 定时器开始  其实， 定时器就是  右侧按钮
    var timer = null;
    timer = setInterval(autoplay,2000);  // 开启定时器
    function autoplay() {
        //  当我们点击时候， 当前的这张图片 先慢慢的走到左边  下一张 (不管下一张在左侧还是右侧)一定先快速走到右侧 （310）的位置，然后慢慢的走到舞台中     （当前的左侧，下一张从右边左移）
        //iNow == 0
        animate(imgs[iNow],{left: -scrollWidth});
        // 当前的那个图片 慢慢的走到 -scrollWidth 位置
        // 变成1   先 ++   ++iNow  先自加  后 运算
        ++iNow > imgs.length -1 ?  iNow = 0 : iNow;
        imgs[iNow].style.left = scrollWidth + "px";  // 立马执行  快速走到右侧
        
        animate(imgs[iNow],{left: 0}); // 下一张走的 0 的位置  慢慢走过来
        setSquare();  // 调用square
    }
    //鼠标经过清除定时器
    js_slider.onmouseover = function() {
        clearInterval(timer);
    }
    //开启定时器
    js_slider.onmouseout = function() {
        clearInterval(timer);  // 要执行定时器 先清除定时器
        timer = setInterval(autoplay,2000);  // 开启定时器
    }
	
	
	
}
