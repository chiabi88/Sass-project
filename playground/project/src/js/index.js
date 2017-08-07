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
				accordionMenu.reset(gnb_menu);
			} else {
				this_obj.addClass('btn-gnb--active');
				gnb.addClass('gnb-wrap--open');
				accordionMenu.init(gnb_menu);
			}
		});
		gnb_mask.on('click', function(){
				btn.removeClass('btn-gnb--active');
				gnb.removeClass('gnb-wrap--open');
			accordionMenu.reset(gnb_menu);
		});

		// accorionMenu
		var accordionMenu = {
			is: '--is-depth',
			open: '--open',
			curr: null,
			list: null,
			init : function(obj) {
				accordionMenu.curr = obj;
				accordionMenu.list = $('[class*=' + accordionMenu.is + ']', accordionMenu.curr);
				console.log('list :', accordionMenu.list);
				accordionMenu.list.children('a').on('click', function(e){
					e.preventDefault();
					var obj_parent = $(this).parent();
					console.log('obj_parent: ',obj_parent);
					accordionMenu.menuOpen(obj_parent);
				});
			},
			reset : function(obj) {
				accordionMenu.curr = obj;
				accordionMenu.menuClose(accordionMenu.curr.find('li'));
				accordionMenu.list = null;
			},
			setOpenClass : function(obj) {
				// class 이름을 찾아 class_open에 저장함
				var class_name, class_open;
				accordionMenu.curr = obj;
				if(accordionMenu.curr.attr('class')){
					class_name = accordionMenu.curr.attr('class').split(' ')[0];
					class_name = class_name.substring(0, class_name.length - accordionMenu.is.length);
					class_open = class_name + accordionMenu.open;
					return class_open;
				}
				return false;
			},
			menuOpen : function(obj) {
				accordionMenu.curr = obj;
				var class_name = accordionMenu.setOpenClass(obj);
				console.log('class_name: ', class_name);
				if(accordionMenu.curr.hasClass(class_name)) {
					accordionMenu.menuClose(accordionMenu.curr);
				} else {
					accordionMenu.curr.addClass(class_name);
					accordionMenu.menuClose(accordionMenu.curr.siblings());
				}
			},
			menuClose : function(obj) {
				accordionMenu.curr = obj;
				var this_children = obj.find('li');
				var class_name = accordionMenu.setOpenClass(obj);
				accordionMenu.curr.removeClass(class_name);
				this_children.each(function(){
					class_name = accordionMenu.setOpenClass($(this));
					$(this).removeClass(class_name);
				});
			}
		};
	};
}(jQuery));