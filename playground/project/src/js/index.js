(function($) {
	'use strict';
	$(document).ready(function(){
		activeGnb();
	});
	// gnb
	
	/**
	 *
	 * 버튼 클릭시 메뉴 여닫기, mask 클릭시 메뉴 닫기
	 * 메뉴 닫을때 모든 열린 뎁스 닫기
	 * 뎁스 '{class}--is-depth'를 가지는 li의 a클릭시 li에 '{class}--open' 클래스 추가
	 * 뎁스 열릴때 다른 뎁스 모두 닫기
	 *
	 */
	
	function activeGnb() {
		var body = $('body'),
				btn = $('#header .btn-gnb'),
				gnb = $('#gnb'),
				gnb_menu = $('.gnb-menu'),
				gnb_mask = $('.gnb-wrap__mask');

		btn.on('click', function(){
			var this_obj = $(this);
			if(gnb.hasClass('gnb-wrap--open')){
				this_obj.removeClass('btn-gnb--active');
				gnb.removeClass('gnb-wrap--open');
				accordionMenu.menuClose(gnb_menu.find('li'));
			} else {
				this_obj.addClass('btn-gnb--active');
				gnb.addClass('gnb-wrap--open');
				accordionMenu.init(gnb_menu);
			}
		});
		gnb_mask.on('click', function(){
				btn.removeClass('btn-gnb--active');
				gnb.removeClass('gnb-wrap--open');
				accordionMenu.menuClose(gnb_menu.find('li'));
		});

		// accorionMenu
		var accordionMenu = {
			is: '--is-depth',
			open: '--open',
			init : function(obj) {
				var this_obj = obj;
				var list = $('[class*=' + accordionMenu.is + ']', this_obj);
				list.children('a').on('click', function(e){
					e.preventDefault();
					var obj_parent = $(this).parent();
					accordionMenu.menuOpen(obj_parent);
				});
			},
			setOpenClass : function(obj) {
				// class 이름을 찾아 class_open에 저장함
				var this_obj = obj,
						class_name, class_open;
				if(this_obj.attr('class')){
					class_name = this_obj.attr('class').split(' ')[0];
					class_name = class_name.substring(0, class_name.length - accordionMenu.is.length);
					class_open = class_name + accordionMenu.open;
					return class_open;
				}
				return false;
			},
			menuOpen : function(obj) {
				var this_obj = obj;
				var class_name = accordionMenu.setOpenClass(obj);
				if(this_obj.hasClass(class_name)) {
					accordionMenu.menuClose(this_obj);
				} else {
					this_obj.addClass(class_name);
					accordionMenu.menuClose(this_obj.siblings());
				}
			},
			menuClose : function(obj) {
				var this_obj = obj;
				var this_children = obj.find('li');
				var class_name = accordionMenu.setOpenClass(obj);
				this_obj.removeClass(class_name);
				this_children.each(function(){
					class_name = accordionMenu.setOpenClass($(this));
					$(this).removeClass(class_name);
				});
			}
		};
	};
}(jQuery));