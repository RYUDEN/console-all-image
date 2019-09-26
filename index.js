javascript:(function() {

	function uniqueArr(arr) {
		return Array.from(new Set(arr))
	}
	function formatConsole(list) {
		
		if (window.console) {
			var cons = console;
			if (cons) {
				list.forEach(item => {
					cons.log("%c\n                                                                                    ", "font-size:100px;background:url('"+ item+"') no-repeat;background-size:contain;");
					cons.log(item);
				});
			}
		}
	}

	function getDomImage() {
		let imgList = [].slice.call(document.querySelectorAll('img')).map(item => item.src);
		return imgList;
	}
	function getStyleImage() {
		const imgList = [];
		let styleEles = [].slice.call(document.querySelectorAll("*[style]"));
		styleEles && styleEles.map(styleEle => {
			const styleStr = Object.entries(styleEle.style).filter(item => item[1]).map(item => item[0] + ':' + item[1]).join(';');
			let styleImages = styleStr.match(/url\((.*)\)/g);
			styleImages = styleImages && styleImages.map(item => item.replace(/url\(['"]*([^'"]*)['"]*\)/,'$1'));
			if(styleImages) imgList.push(...styleImages);
		});
		return imgList;
	}
	function getCssImage() {
		const styleEles = document.querySelectorAll('style');
		return [].slice.call(styleEles).map(styleEle => {
			const css = styleEle.textContent;
			const cssImages = css.match(/url\((.*)\)/g);
			return cssImages && cssImages.map(item => item.replace(/url\((.*)\)/,'$1')) || [];
		});
	}
	function getImages() {
		return getDomImage().concat(...getCssImage()).concat(...getStyleImage());
	}
	let imgs = getImages();
	imgs = uniqueArr(imgs);
	formatConsole(imgs);
})();