(function(ssq) {
	'use strict';
	ssq(document).ready(function(){
		activeGnb();
	});
	// gnb
	function activeGnb() {
		var body = ssq('body'),
				btn = ssq('#header .btn-gnb'),
				gnb = ssq('#gnb'),
				depth1 = ssq('.gnb__depth1--is-depth2', gnb),
				depth2 = ssq('.gnb__depth2');
		btn.on('click', function(){
			body.toggleClass('is-gnb--open');
		});
		depth1.children('a').on('click', function(e){
			e.preventDefault();
			ssq(this).toggleClass('gnb__depth1--open')
				.parent()
				.siblings()
				.children('a')
				.removeClass('gnb__depth1--open');
		});
	};
}(jQuery));