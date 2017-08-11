(function($) {
	'use strict';
	$(document).ready(function(){
		activeGnb();
		activeTab();
		activeChangeTheme();
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
		var body, btn, gnb, gnb_menu, gnb_mask, accordionMenu;

		body = $('body');
		btn = $('#header .btn-gnb');
		gnb = $('#gnb');
		gnb_menu = $('.gnb-menu');
		gnb_mask = $('.gnb-wrap__mask');
		accordionMenu = {
			is: '--is-depth',
			open: '--open',
			curr: null,
			list: null,
			init : function(obj) {
				accordionMenu.curr = obj;
				accordionMenu.list = $('[class*=' + accordionMenu.is + ']', accordionMenu.curr);
				accordionMenu.list.children('a').on('click', function(e){
					e.preventDefault();
					var obj_parent = $(this).parent(); 
					accordionMenu.menuOpen(obj_parent);
				});
				return false;
			},
			// 전체 닫기
			reset : function(obj) {
				accordionMenu.curr = obj;
				accordionMenu.menuClose(accordionMenu.curr.find('li'));
			},
			//  기존클래스에 '*--open'을 추가한 클래스를 구한다.
			setOpenClass : function(obj) {
				// class 이름을 찾아 class_open에 저장함
				var class_name, class_open;
				accordionMenu.curr = obj; 
				if(accordionMenu.curr.attr('class')){
					class_name = accordionMenu.curr.attr('class').split(' ')[0]; 
					class_name = class_name.substring(0, class_name.length - accordionMenu.is.length); 
					class_open = class_name + accordionMenu.open;
					return class_open;
				} else {
					return false;
				}
			},
			// 메뉴 오픈
			menuOpen : function(obj) {
				accordionMenu.curr = obj;
				var class_name = accordionMenu.setOpenClass(obj); 
				if(accordionMenu.curr.hasClass(class_name)) { 
					accordionMenu.menuClose(accordionMenu.curr);
				} else {
					accordionMenu.curr.addClass(class_name);
					accordionMenu.menuClose(accordionMenu.curr.siblings());
				}
			},
			// 메뉴 닫기
			menuClose : function(obj) {
				var this_children, class_name;
				accordionMenu.curr = obj;
				class_name = accordionMenu.setOpenClass(accordionMenu.curr);
				accordionMenu.curr.removeClass(class_name);
				this_children = accordionMenu.curr.find('li');
				this_children.each(function(){
					class_name = accordionMenu.setOpenClass($(this));
					if($(this).hasClass(class_name)){
						$(this).removeClass(class_name);
					}
				});
			}
		};

		// 버튼 클릭시 
		accordionMenu.init(gnb_menu);
		btn.on('click', function(){
			var this_obj = $(this);
			if(gnb.hasClass('gnb-wrap--open')){
				this_obj.removeClass('btn-gnb--active');
				gnb.removeClass('gnb-wrap--open');
				accordionMenu.reset(gnb_menu);
			} else {
				this_obj.addClass('btn-gnb--active');
				gnb.addClass('gnb-wrap--open');
			}
		});
		// 배경 클릭시
		gnb_mask.on('click', function(){
				btn.removeClass('btn-gnb--active');
				gnb.removeClass('gnb-wrap--open');
				accordionMenu.reset(gnb_menu);
		});
	}

	function activeTab() {
		var tab, tab_2, tab_3;
		tab = {
			curr: null,
			menu: '.tab-menu', 
			con: '.tab-con',
			init: function(obj){
				tab.curr = obj;
				$('.tab-menu:not(.tab-menu--open)', tab.curr).next().hide();
				tab.clickEvent(tab.curr);
			},
			clickEvent: function(obj){
				var tab_menu, tab_con;
				tab.curr = obj;
				tab_menu = tab.curr.children(tab.menu);
				tab_con = tab.curr.children(tab.con);
				tab_menu.children('a').click(function(e){
					e.preventDefault();
					var this_parent = $(this).parent();
					tab_menu.removeClass('tab-menu--open');
					this_parent.addClass('tab-menu--open');
					tab_con.hide();
					this_parent.next().show();
				});
			}
		}
		tab_2 = $('.guide-tab--2');
		tab_3 = $('.guide-tab--3');
		
		tab.init(tab_2);
		tab.init(tab_3);
	}

	function activeChangeTheme() {
		var body, btn;
		body = $('body');
		btn = $('.btn__theme-change');
		btn.on('click', function(){
			if(body.hasClass('theme')){
				body.removeClass('theme');
			} else {
				body.addClass('theme');
			}
		});
	}
}(jQuery));