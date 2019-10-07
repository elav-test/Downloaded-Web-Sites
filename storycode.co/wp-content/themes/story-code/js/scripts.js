jQuery(function($){
										
	resizeWindow();
	  		
 	$(window).resize(resizeWindow);
	
	$(window).scroll(scrollWindow);
	
	// LOADING OVERLAY
	// http://stackoverflow.com/questions/8788802/prevent-safari-loading-from-cache-when-back-button-is-clicked - rather than using $(window).pageshow(function(){
	$(window).bind('pageshow', function(event) {
		if ($('#overlay').length) {
			$('#overlay').delay(500).queue(function(next) {
				var $overlay = $(this);
				if ($('#overlay img.code').length) {
					var $img = $('#overlay img.code');
					$img.addClass('animated');
					setTimeout(function() { 
						$overlay.stop().fadeOut(600);
					}, 1500);	
				} else {
					$overlay.stop().fadeOut(600);
				}
			});
		}
	});
	
	// GDPR consent
	if ($('#consent').length) {
		
		var non_private_browsing = true;
  
		detectPrivateMode(function(is_private) {
			if (is_private) {
				non_private_browsing = false;
			} 
		});
		
		$(window).load(function(){
			if(typeof(Storage) !== "undefined") {
				if (localStorage.storycodeShowConsentV2 != 1) {
					if (non_private_browsing) {
						$('#consent').show(0);
					}
				}
			}
		});
		
		$('#consent .close').click(function() {
			$('#consent').fadeOut(600, function() {
				if(typeof(Storage) !== "undefined") {
					if (non_private_browsing) {
						localStorage.storycodeShowConsentV2 = 1;
					}
				}                               
			});
		});
		
    }
	
	// MOBILE TOGGLE
	$('.mobile_toggle span').click(function() {
		$('.mobile_toggle').toggleClass('open');
		$('.mobile_menu ul').slideToggle('fast');
	});
	
	// NAV TOGGLE
	$('.toggle_nav').click(function(e) {
		e.preventDefault();
		if ($('body, html').hasClass('nav-open')) {
			$('body, html').removeClass('nav-open');
			$('#nav').fadeOut(300);
		} else {
			$('body, html').addClass('nav-open');
			$('#nav').fadeIn(300);
		}
	});
	
	// HOME: SLIDER
	if ($('#home .blog .slider .items').length) {
		$slick = $('#home .blog .slider .items').slick({
			arrows: false,
			infinite: true,
			centerMode: false, 
			variableWidth: true,
			slidesToShow: 2,
			draggable: false,
			swipe: false,
			responsive: [
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 1,
						variableWidth: false
					}
				}
		  	]
		});
		$('#home .blog .slider .nav span').click(function() {
			var num = $(this).attr('rel');
			$('#home .blog .slider .nav span').removeClass('active');
			$(this).addClass('active');
			$('#home .blog .slider .items').slick('slickGoTo', num);
		});
	}
	
	// HOME: WORKSHOPS
	$('#home .workshops .tabs .nav li').click(function(){
		$('#home .workshops .tabs .nav li.active').removeClass('active');
        $(this).addClass('active');
        var rel = $(this).attr('rel');
		$('#home .workshops .tabs .tab').hide(0); 
        $('#home .workshops .tabs .tab.tab-' + rel).fadeIn(300); 
	});
	
	// ABOUT: STICKY NAV
	if ($('#about .main .nav').length) {
		var offset = $('#header').outerHeight();
		$('#about .main .nav').stick_in_parent({ offset_top: offset });
		$('#about .main .nav a').click(function(e) {
			e.preventDefault();
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top - offset + 1
				}, 300);
				return false;
			}
		});
	}
	
	// ABOUT: BIOS
	$('#about .team .member span').click(function() {
		var rel = $(this).attr('rel');
		$('body, html').addClass('nav-open');
		$('#about .bio.bio-' + rel).fadeIn(300);
	});
	$('#about .bio .close').click(function() {
		$('body, html').removeClass('nav-open');
		$('#about .bio').fadeOut(300);
	});	
	
	// ABOUT: CONTACT FORM
	if ($('#about .contact .form .formwrap').length) {
		$('#about .contact .form .formwrap label.trigger').click(function() {
			$(this).addClass('moved');
			$(this).next('.input').addClass('active').focus();
		});
		if ($('#about .contact .form .formwrap form').length) {
			$('#about .contact .form .formwrap form').validate({
				debug: false,
				rules: {
					cname: {
						required: true
					},
					cemail: {
						required: true,
						email: true
					},
					message: {
						required: true
					}
				},
				submitHandler: function(form) {
					var $this = $('#about .contact .form .formwrap form');
					$this.parent('.formwrap').find('.response').css('margin-top','10px').html('<p>Working...</p>');
					$.post(ajax_dir + 'contact-submit.php', $(form).serialize(), function(data) {
						$this.parent('.formwrap').find('.response').html('');
						$this.html('<p>' + data + '</p>').fadeIn(300);
					});
				}
			});
		}
	}
			
	// MOBY / OZ: PARALLAX BUBBLES / BIRDS
	// https://codepen.io/ravenwilde/pen/ehiny
	if ($('#parallax-lvl-0').length) {
		$(window).bind('scroll',function(e){
			parallaxScroll();
		});
		function parallaxScroll(){
			var scrolled = $(window).scrollTop();
			$('#parallax-lvl-0').css('top',(0 - (scrolled * .9))+'px');
			$('#parallax-lvl-1').css('top',(0 - (scrolled * .75))+'px');
			$('#parallax-lvl-2').css('top',(0 - (scrolled * .5))+'px');
			$('#parallax-lvl-3').css('top',(0 - (scrolled * .25))+'px');
		}
	}
	
	// ALICE: SUITS
	// https://codepen.io/ravenwilde/pen/ehiny
	if ($('#parallax-suits-0').length) {
		$(window).bind('scroll',function(e){
			parallaxSuitsl();
		});
		function parallaxSuitsl(){
			var scrolled = $(window).scrollTop();
			$('#parallax-suits-0').css('top',(0 - (scrolled * .03))+'px');
			$('#parallax-suits-1').css('top',(0 - (scrolled * .1))+'px');
			$('#parallax-suits-2').css('top',(0 - (scrolled * .05))+'px');
			$('#parallax-suits-3').css('top',(0 - (scrolled * .08))+'px');
		}
	}
		
	// MOBY: ARROWS WAYPOINT
	if ($('#bottom .arrows').length) {
		var arrows = $('#bottom .arrows').waypoint({
			handler: function(direction) {
				$('#bottom .arrows .arrow').addClass('animate');
			},
			offset: '30%'
		});
		var arrowsout = $('#bottom .arrows').waypoint({
			handler: function(direction) {
				$('#bottom .arrows .arrow').removeClass('animate');
			},
			offset: '80%'
		});
	}
	
	// MOBY: UPCOMING WORKSHOP WAYPOINT
	if ($('#bottom .workshop .tlt').length) {
		$('#bottom .workshop .tlt').textillate({
			autoStart: false,
			loop: false,
			in: {
				effect: 'bounceInDown',
				delayScale: 0.8,
				shuffle: true
			}/*,
			out: {
				effect: 'fadeOut',
				shuffle: true
			}*/
		});
		var workshop = new Waypoint.Inview({
			element: $('#bottom .workshop .wrapper')[0],
			enter: function() {
				$('#bottom .workshop .tlt').fadeIn(300, function() {
					$('#bottom .workshop .tlt').textillate('in');	
				});
			},
			exit: function() {
				//$('#bottom .workshop .tlt').textillate('out');	
			}
		});
	}
	
	// SERVICES TABS
	if ($('#services .tabs .tab').length) {
		$('#services .tabnav .link').click(function() {
			var selected = $(this).attr('rel');
			$('#services .tabnav .link').removeClass('active');
			$('#services .tabs .tab.active').hide(0, function() {
				$(this).removeClass('active');
				$('#services .tabs .tab.' + selected).fadeIn(300).addClass('active');
			});
			$(this).addClass('active');
			if ($('#services .tabs .tab .cycle-slideshow').length) {
				$('#services .tabs .tab .cycle-slideshow').cycle('goto', 2);
			}
		});		
	}
	
	// ABOUT BIOS
	$('#page .team .person .name').click(function() {
		var rel = $(this).attr('rel');
		$('body, html').addClass('nav-open');
		$('#page .bio.bio-' + rel).fadeIn(300);
	});
	$('#page .bio .close').click(function() {
		$('body, html').removeClass('nav-open');
		$('#page .bio').fadeOut(300);
	});	
		
	// OZ: LEGS WAYPOINT
	if ($('#main .legs').length) {
		var legs = $('#main .legs').waypoint({
			handler: function(direction) {
				$('#main .legs img').addClass('visible');
			},
			offset: '50%'
		});
		var legsout = $('#main .legs').waypoint({
			handler: function(direction) {
				$('#main .legs img').removeClass('visible');
			},
			offset: '80%'
		});
	}
	
	// OZ: WORKSHOP WAYPOINT
	if ($('body.world-oz #bottom .workshop').length) {
		var oz_workshop_in = $('body.world-oz #bottom .workshop').waypoint({
			handler: function(direction) {
				$('body.world-oz #bottom').addClass('green');
			},
			offset: '50%'
		});
		var oz_workshop_out = $('body.world-oz #bottom .workshop').waypoint({
			handler: function(direction) {
				$('body.world-oz #bottom').removeClass('green');
			},
			offset: '80%'
		});
	}
	
	// ALICE: CAT INVIEW
	if ($('#main .cat').length) {
		var cat = new Waypoint.Inview({
			element: $('#main .cat img')[0],
			entered: function() {
				$('#main .cat img').addClass('visible');
			},
			exit: function() {
				$('#main .cat img').removeClass('visible');
			}
		});	
	}
	
	// ALICE: FOOTER INVIEW
	if ($('body.world-alice .footer').length) {
		var cat = new Waypoint.Inview({
			element: $('body.world-alice .footer')[0],
			entered: function() {
				$('body.world-alice #bottom .lower').addClass('swiped');
			},
			exit: function() {
				$('body.world-alice #bottom .lower').removeClass('swiped');
			}
		});	
	}
	
	// CONTACT FORM
	if ($('.contact_form').length) {
		$.validator.addMethod('defaultInvalid', function(value, element) {
			switch (element.value) {
				case 'Name':
					if (element.name == 'cname') return false;
					break;
				case 'Email Address':
					if (element.name == 'cemail') return false;
					break;
				case 'Message':
					if (element.name == 'message') return false;
					break;
				default: return true; 
					break;
			}
		},$.validator.messages.required);
		$('.contact_form').validate({
			debug: false,
			rules: {
				cname: {
					required: true,
					defaultInvalid: true
				},
				cemail: {
					required: true,
					email: true,
					defaultInvalid: true
				},
				message: {
					required: true,
					defaultInvalid: true
				}
			},
			submitHandler: function(form) {
				var $this = $('.contact_form');
				$this.parent('.formwrap').find('.response').css('margin-top','10px').html('<p>Working...</p>');
				$.post(ajax_dir + 'contact-submit.php', $(form).serialize(), function(data) {
					$this.parent('.formwrap').find('.response').html('');
					$this.html('<p>' + data + '</p>').fadeIn(300);
				});	
			}
		});
	}
	
	// BLOG LOAD MORE		
	$('#blog .stories .loadmore span').click(function() {		
		if ($('#blog .stories .cols.hidden').length) {		
			var count = $('#blog .stories .cols.hidden').length;		
			if (count > 1) {		
				$('#blog .stories .cols.hidden:eq(0)').removeClass('hidden').show(0);		
				$('#blog .stories .cols.hidden:eq(0)').removeClass('hidden').show(0);		
				if (count == 2) {		
					$('#blog .stories .loadmore').hide(0);		
				}		
			} else {		
				$('#blog .stories .cols.hidden').removeClass('hidden').show(0);		
				$('#blog .stories .loadmore').hide(0);		
			}		
		} else {		
			$('#blog .stories .loadmore').hide(0);			
		}		
	});
		
});
	
function resizeWindow() {

	var ww = $(window).width();
	var wh = $(window).height();
	
	// PADTOP / STICKY for HEADER
	if ($('#padtop').length) { 
		if (ww > 768) {
			var hh = $('#header').outerHeight();
			$('#padtop').css('height', hh + 'px');
		} else {
			$('#padtop').css('height', '0px');
			$('#header').removeClass('sticky');
		}
	}
		
	// HOME: FEATURE
	if ($('#home .feature').length) {	
		if (ww > 768) {
			var hh = $('#header').outerHeight();
			var abouth = $('#home .feature .about .wrap .centertext').outerHeight();	
			if (abouth < wh) {
				$('#home .feature .about .wrap .centertext').css('height', wh + 'px');
			}
			var fh = hh + $('#home .feature .movable.white').outerHeight() +
					 hh + $('#home .feature .movable.red').outerHeight() + 120 + 
					 hh + $('#home .feature .movable.black').outerHeight() + 
					 $('#home .feature .about .wrap .centertext').outerHeight();		 	
			$('#home .feature .inner').css('height', fh + 'px');
		} else {
			$('#home .feature .about .wrap .centertext').css('height', 'auto');
			$('#home .feature .inner').css('height', 'auto');
		}
	}
	
	// ABOUT: INTRO
	if ($('#about .intro').length) {
		if (ww > 768) {
			var lefth = $('#about .intro .left').outerHeight();
			var righth = $('#about .intro .right').outerHeight();
			var hh = $('#header').outerHeight();
			var ih = hh + $('#about .intro .left').outerHeight() +
					 hh + $('#about .intro .right').outerHeight();
			$('#about .intro').css('height', ih + 'px');
		} else {
			$('#about .intro').css('height', 'auto');
		}
	}
	
	// MAGAZINE FEATURE
	if ($('#blog .feature').length) {
		var hh = $('#header').outerHeight();
		$('#blog .feature').css('margin-top','-' + hh + 'px');
	}
	
	// BLOG STORY STICKY SECTION
	if ($('.stickme').length) {
		if (ww < 1024) {
			$('.stickme').trigger("sticky_kit:detach");
		} else {
			if ($('#header').length) {
				var offset = $('#header').outerHeight();
			} else {
				offset = 0;	
			}
			$('.stickme').stick_in_parent({ offset_top: offset });
		}
	}
			 					
}

var iScrollPos = 0;

function scrollWindow() {
	
	var scrollpos = $(window).scrollTop();
	var ww = $(window).width();
	
	// HOME: FEATURE SCROLL CIRCLE
	var triggerPoint = $('#home .feature').outerHeight() - 500;
	if (scrollpos > triggerPoint) {
		$('#home .feature .inner .scroll').fadeOut(300);
	} else {
		$('#home .feature .inner .scroll').fadeIn(300);
	}
		
	// ABOUT: STICKY COLOR ON CURRENT DIV IN VIEW
	if ($('#about .main .nav').length) {
		
		var offset = $('#header').outerHeight();
		
		var eh = $('#about .main .expertise').offset().top;
		var ch = $('#about .main .clients').offset().top;
		var th = $('#about .main .team').offset().top;
		var cnh = $('#about .contact').offset().top;
		
		if ( ((scrollpos+offset) > eh) && ((scrollpos+offset) < (ch-offset)) ) {
			//console.log('expertise');
			$('#about .main .nav li').removeClass('active');
			$('#about .main .nav li.nav-expertise').addClass('active');
		}
		if ( ((scrollpos+offset) > ch) && ((scrollpos+offset) < (th-offset)) ) {
			//console.log('clients');
			$('#about .main .nav li').removeClass('active');
			$('#about .main .nav li.nav-clients').addClass('active');
			$('#about .main .nav').addClass('white');
		} else {
			$('#about .main .nav').removeClass('white');	
		}
		if ( ((scrollpos+offset) > th) && ((scrollpos+offset) < (cnh-offset)) ) {
			//console.log('team');
			$('#about .main .nav li').removeClass('active');
			$('#about .main .nav li.nav-team').addClass('active');
		}
		
	}
	
	// STICKY NAV
	if ($('#header').length) {
		if ($('#header').hasClass('alt')) {
			// do nothing on worlds pages, handled elsewhere
		} else {
			if (ww > 768) {
				var triggerPoint = 300;
				if ($('#header').hasClass('template-home')) {
					triggerPoint = $('#home .feature').outerHeight();
				}
				if ($('#header').hasClass('template-about')) {
					triggerPoint = $('#about .intro').outerHeight();
				}
				if (scrollpos > triggerPoint) {
					$('#header').addClass('sticky');
				} else {
					$('#header').removeClass('sticky');
				}
			}
		}
	}
	
	// VIDEO INTRO		
	if ($('#video').length) {
		
		var wh = $(window).height();
		
		$('#video').css('height', wh + 'px');
		
		var introheight = $('#intro .wrapper').outerHeight() - 700;
		var scrollBottom = scrollpos + $(window).height();
		if (scrollpos <= introheight) {
			$('#video').addClass('fixed').css('top','0px');
		} else {
			$('#video').removeClass('fixed').css('top',introheight + 'px');
		}
				
	}
	
	// MOBY: WHALE
	if ($('#main .moby').length) {
		var d = $(document).height(),
			c = $(window).height();
		scrollPercent = (scrollpos / (d - c));
		var distance = (scrollPercent * 700);
		var right = (distance - 1600) + 20;
		/* go from -1600px right to -1100px right - 500 pixels total distance */
		$('#main .moby img').css({
			'right': right + 'px'
		});
	}
	
	// MOBY: BOAT + WAVES
	// http://jsfiddle.net/PvVdq/2477/
	if ($('#bottom .waves').length) {
		var d = $(document).height(),
			c = $(window).height();
		scrollPercent = (scrollpos / (d - c));
		var left = (scrollPercent * $('#bottom').width());
		$('#bottom .waves').css({
			'background-position': left + 'px bottom'
		});
	}
	
	// OZ: BALLOON
	// http://jsfiddle.net/PvVdq/2477/
	if ($('#bottom .magazine .balloon').length) {
		var d = $(document).height(),
			c = $(window).height();
		scrollPercent = (scrollpos / (d - c));
		bottom = scrollPercent * 100;
		$('#bottom .magazine .balloon').css({
			'bottom': bottom + '%'
		});
	}
	
	// ALICE: BLADES
	// http://jsfiddle.net/PvVdq/2477/
	if ($('body.world-alice #bottom .grass .inner').length) {
		var d = $(document).height(),
			c = $(window).height();
		scrollPercent = (scrollpos / (d - c));
		right = scrollPercent * 100;
		right = 100 - right;
		$('body.world-alice #bottom .grass .inner').css({
			'right': right + '%'
		});
	}
	
	// WORLDS PAGES STICKY NAV
	if ($('#header.alt').length) {
		if (ww > 768) {
			var iCurScrollPos = $(this).scrollTop();	
			if (iCurScrollPos > iScrollPos) {
				//scrolling down
				$('#header.alt').fadeOut(300);
			} else {
				// scrolling up
				$('#header.alt').fadeIn(300);
			}
			iScrollPos = iCurScrollPos;
		}
	}
	
}

if ($('#home .feature').length) {
	
	var ww = $(window).width();
	
	if (ww > 768) {
		
		var hh = $('#header').outerHeight();
		var whiteHeight = $('#home .feature .movable.white').outerHeight();
		var redHeight = $('#home .feature .movable.red').outerHeight();
		var blackHeight = $('#home .feature .movable.black').outerHeight();
		
		var scroll = function () {
			var scrollpos = $(window).scrollTop();
			if ( scrollpos <= hh + whiteHeight ) {
				//console.log('1');
				var redtop = hh + 120;
				$('#home .feature .movable.red').css({'top': redtop + 'px', 'position': 'fixed'});
				$('#home .feature .movable.black').css({'top': hh + 'px', 'position': 'fixed'});
				$('#home .feature .about').css({'top': hh + 'px', 'position': 'fixed'});
			}
			if ( (hh + whiteHeight < scrollpos) && (scrollpos <= hh + whiteHeight + hh + redHeight + 120) ) {
				//console.log('2');
				var redtop =  hh + whiteHeight + 120;
				var blacktop = scrollpos;
				var abouttop = scrollpos;
				$('#home .feature .movable.red').css({'top': redtop + 'px', 'position': 'absolute'});
				$('#home .feature .movable.black').css({'top': hh + 'px', 'position': 'fixed'});
				$('#home .feature .about').css({'top': hh + 'px', 'position': 'fixed'});
			}
			if ( (hh + whiteHeight + hh + redHeight + 120 < scrollpos) && (scrollpos <= hh + whiteHeight + hh + redHeight + 120 + blackHeight + hh) ) {
				//console.log('3');
				var redtop =  hh + whiteHeight + 120;
				var blacktop = hh + whiteHeight + hh + redHeight + 120;
				var abouttop = scrollpos;
				$('#home .feature .movable.red').css({'top': redtop + 'px', 'position': 'absolute'});
				$('#home .feature .movable.black').css({'top': blacktop + 'px', 'position': 'absolute'});
				$('#home .feature .about').css({'top': hh + 'px', 'position': 'fixed'});
			}
			if (scrollpos > hh + whiteHeight + hh + redHeight + 120 + blackHeight + hh) {
				//console.log('4');
				var redtop =  hh + whiteHeight + 120;
				var blacktop = hh + whiteHeight + hh + redHeight + 120;
				var abouttop = hh + whiteHeight + hh + redHeight + 120 + blackHeight + hh;
				var headertop = hh + whiteHeight + hh + redHeight + 120 + blackHeight + hh;
				$('#home .feature .movable.red').css({'top': redtop + 'px', 'position': 'absolute'});
				$('#home .feature .movable.black').css({'top': blacktop + 'px', 'position': 'absolute'});
				$('#home .feature .about').css({'top': abouttop + 'px', 'position': 'absolute'});
			} 
		};
		
		scroll();
		
		var waiting = false;
		
		$(window).scroll(function () {
			if (waiting) {
				return;
			}
			waiting = true;
		
			scroll();
		
			setTimeout(function () {
				waiting = false;
			}, 1);
			
		});

	} else {
	
		$('#home .feature .movable.red').css({'top': 'auto', 'position': 'relative'});
		$('#home .feature .movable.black').css({'top': 'auto', 'position': 'relative'});
		$('#home .feature .about').css({'top': 'auto', 'position': 'relative'});
		$('#home .feature .about .wrap .centertext').css('height', 'auto');
		$('#home .feature .inner').css('height', 'auto');
		
	}

}

if ($('#about .intro').length) {
	
	var ww = $(window).width();
	
	if (ww > 768) {
		
		var hh = $('#header').outerHeight();
		var leftHeight = $('#about .intro .left').outerHeight();
		var rightHeight = $('#about .intro .right').outerHeight();
		
		var scroll = function () {
			var scrollpos = $(window).scrollTop();
			if ( scrollpos <= hh + leftHeight ) {
				$('#about .intro .right').css({'top': hh + 'px', 'position': 'fixed'});
			}
			if ( (hh + leftHeight < scrollpos) && (scrollpos <= hh + leftHeight + hh + rightHeight) ) {
				var righttop =  hh + leftHeight;
				var headertop = hh + leftHeight;
				$('#about .intro .right').css({'top': righttop + 'px', 'position': 'absolute'});
			}
			if (scrollpos > hh + leftHeight + hh + rightHeight) {
				var righttop =  hh + leftHeight;
				var headertop = hh + leftHeight;
				$('#about .intro .right').css({'top': righttop + 'px', 'position': 'absolute'});
			}
		};
		
		scroll();
		
		var waiting = false;
		
		$(window).scroll(function () {
			if (waiting) {
				return;
			}
			waiting = true;
		
			scroll();
		
			setTimeout(function () {
				waiting = false;
			}, 1);
			
		});
		
	} else {
		
		$('#about .intro .right').css({'top': 'auto', 'position': 'relative'});
		
	}

}