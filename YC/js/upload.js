var imgFile = []; 
var imgSrc = []; 
var imgName = []; 
$(function(){
	$('.content-img-list').on('mouseover','.content-img-list-item',function(){
		$(this).children('a').removeClass('hide');
	});
	$('.content-img-list').on('mouseleave','.content-img-list-item',function(){
		$(this).children('a').addClass('hide');
	});

	$(".content-img-list").on("click",'.content-img-list-item a',function(){
	    	var index = $(this).attr("index");
			imgSrc.splice(index, 1);
			imgFile.splice(index, 1);
			imgName.splice(index, 1);
			var boxId = ".content-img-list";
			addNewContent(boxId);
			if(imgSrc.length<3){
				$('.content-img .file').show();
			}
	  });
	$('#upload').on('change',function(){			
		
		if(imgSrc.length>=3){
			return alert("No more than 3 images");
		}
		var imgSize = this.files[0].size;  
		if(imgSize>1024*1024*1){
			return alert("Image needs to be less than 1M");
		}
		console.log(this.files[0].type)
		if(this.files[0].type != 'image/png' && this.files[0].type != 'image/jpeg' && this.files[0].type != 'image/gif'){
			return alert("Image format is wrong");
		}

		var imgBox = '.content-img-list';
		var fileList = this.files;
		for(var i = 0; i < fileList.length; i++) {
			var imgSrcI = getObjectURL(fileList[i]);
			imgName.push(fileList[i].name);
			imgSrc.push(imgSrcI);
			imgFile.push(fileList[i]);
		}
		if(imgSrc.length==3){
			$('.content-img .file').hide();
		}
		addNewContent(imgBox);
		this.value = null;
	})

    $('#btn-submit-upload').on('click',function(){
        var formFile = new FormData();
        $.each(imgFile, function(i, file){
            formFile.append('myFile[]', file);
        });
        console.log(imgFile)
    });

});

function removeImg(obj, index) {
	imgSrc.splice(index, 1);
	imgFile.splice(index, 1);
	imgName.splice(index, 1);
	var boxId = ".content-img-list";
	addNewContent(boxId);
}

function addNewContent(obj) {
	$(obj).html("");
	for(var a = 0; a < imgSrc.length; a++) {
		var oldBox = $(obj).html();
		$(obj).html(oldBox + '<li class="content-img-list-item"><img src="'+imgSrc[a]+'" alt=""><a index="'+a+'" class="hide delete-btn"><i class="ico-delete"></i></a></li>');
	}
}

function getObjectURL(file) {
	var url = null ;
	if (window.createObjectURL!=undefined) { // basic
		url = window.createObjectURL(file) ;
	} else if (window.URL!=undefined) { // mozilla(firefox)
		url = window.URL.createObjectURL(file) ;
	} else if (window.webkitURL!=undefined) { // webkit or chrome
		url = window.webkitURL.createObjectURL(file) ;
	}
	return url ;
}