
/* Slider class, maintain proper pagination */
function Slider(id, width, height, pictStruct, dark, autoRotate) {
	this.id_ = id;
	this.pictStruct_ = pictStruct;
	this.dark_ = dark;
	this.activePicture_ = 0;
	this.autoRotate_ = autoRotate;
	this.rotatePeriod_ = 5000;	// period between slides in ms
	this.timeoutID_ = null;

	this.pictures_ = 0;
	for (var i in this.pictStruct_) {
		this.pictures_ += this.pictStruct_[i];
	}
	
	$('#' + id + 'Slider').slidesjs({
		width: width,
		height: height,
		callback: {
			complete: this.complete.bind(this)
		}		
	});	
	
	if (this.autoRotate_)
		this.timeoutID_ = setTimeout(this.nextPict.bind(this), this.rotatePeriod_);
}

Slider.prototype.complete = function(number) {
	this.activePicture_ = number - 1;
	this.pageClickByNo();
}

Slider.prototype.prevPict = function() {
	$('#' + this.id_ + 'Slider').children('a.slidesjs-previous').click();
	return false;
}

Slider.prototype.nextPict = function() {
	$('#' + this.id_ + 'Slider').children('a.slidesjs-next').click();
	
	if (this.autoRotate_)
		this.timeoutID_ = setTimeout(this.nextPict.bind(this), this.rotatePeriod_);
	
	return false;
}

/* Counts page number per given picture number.
* One page contains few pictures.
*/
Slider.prototype.findPage = function(number) {
	var p = 0;
	var pictNo = 0;
	for (var i in this.pictStruct_) {
		pictNo += this.pictStruct_[i];
		if (number < pictNo)
			break;
		p += 1;
	}

	return p;
}

/* Counts number of picture which represent given page */
Slider.prototype.findPict = function(pageNo) {
	var pictNo = 0;
	for (var i=0; i<pageNo; ++i) {
		pictNo += this.pictStruct_[i];
	}
	return pictNo;
}

Slider.prototype.highlightPage = function(page) {
	$(page).siblings().attr( "class", "paginationRect unselectedRect" + (this.dark_ ? "Dark" : "Bright"));
	$(page).attr( "class", "paginationRect selectedRect");
}

Slider.prototype.showText = function(page) {
	$('#' + this.id_ + 'Text .descriptions div').each(function(index) {
		if (index == page)
			$( this ).show();
		else
			$(this).hide();
	});	
}

Slider.prototype.pageClickByNo = function() {
	var pageNo = this.findPage(this.activePicture_);
	var child = $('#' + this.id_ + "Text .pagination").children()[pageNo];
	this.highlightPage(child);
	this.showText(pageNo);
}

// click on apriopriate page in slider given as div
Slider.prototype.pageClick = function(clicked) {
	var pageNo = 0;
	for (c in $(clicked).parent().children()) {		// find number of clicked page
		if ($(clicked).parent().children()[c] == clicked) {
			break;
		}
		++pageNo;
	}
	
	var pictNo = this.findPict(pageNo);
	this.activePicture_ = pictNo;
	$('#' + this.id_ + 'Slider' + ' .slidesjs-pagination a')[pictNo].click();
	this.highlightPage(clicked);
}

/* find object id from <div class="panel"> parent */
function getID(thisObj) {
	return $(thisObj).closest('div.panel').attr('id');
}

function stopAutoRotate(id) {
	window[id+'Slider'].autoRotate_ = false;	// stop auto rotating after user click
	if (window[id+'Slider'].timeoutID_ != null)
		clearTimeout(window[id+'Slider'].timeoutID_);
}

/* find object name and click apriopriate object's method */
function pageClick(thisObj) {
	var id = getID(thisObj);
	stopAutoRotate(id);
	window[id+'Slider'].pageClick(thisObj);
}

function prevPict(thisObj) {
	var id = getID(thisObj);
	stopAutoRotate(id);
	window[id+'Slider'].prevPict();	
}

function nextPict(thisObj) {
	var id = getID(thisObj);
	stopAutoRotate(id);
	window[id+'Slider'].nextPict();
}

/* Number of pictures per single page */
var laptopPictPerPage = {
	0: 2,
	1: 2,
	2: 2,
	3: 2,
	4: 3,
	5: 4,
	6: 4
};

var thirdPictPerPage = {
	0: 10,
	1: 1,
	2: 2,
	3: 1
	
};

var fourthPictPerPage = {
	0: 1,
	1: 1,
	2: 1,
	3: 1,
	4: 1,
	5: 1,
	6: 1,
	7: 1
};

var fifthPictPerPage = {
	0: 5,
	1: 12,
	2: 5
	};

var sixthPictPerPage = {
	0: 1,
	1: 1,
	2: 1
};

var seventhPictPerPage = {
	0: 4,
	1: 5,
	2: 6,
	3: 2,
	4: 3

};



