/*
 * jQuery Scramble Text v1.0 - http://gmix.jp/
 *
 *
 * TERMS OF USE - jQuery Scramble Text
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2011 TKHD/GMX - tok@gmix.jp
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 * 
 * 
 * 
 * 
 * USAGE : 
 * - speed : milliseconds
 * - effect : "simple" 			- simple transition, text appears one by one
 *            "scramble" 		- scramble text
 *            
 *            
 *
*/
(function($){
	$.fn.scrambleText = function(options){
		var options = $.extend({
			speed: undefined,
			effect: 'scramble'
			//wrapper: 'div'
		}, options || {});
		if (options.speed === undefined) return this;
		
		var textToSwap = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", 
							"a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", 
							"!", "$", "%", "&", "#", "?", "@"];
		
		var randomNum;
		var total = 0;
		var count = 0;
		var eachText = function(len, txt){
			this.len = len;
			this.txt = txt;
			this.pos = 0;
		};
		var scramblePref = new Array();
		this.each(function(i){
			
			var text = $(this).html();
			scramblePref[i] = new eachText(text.length, text);
		});
		total = this.length 
		var local = this;
		var timer = setInterval(eventtrigar, options.speed);
		function eventtrigar(){
			
			$(local).each(function(i){
				if(scramblePref[i].pos <= scramblePref[i].len) {
					
					var tmpTxt = scramblePref[i].txt;
					scramblePref[i].pos = parseInt(scramblePref[i].pos) + 1;
					
					if (options.effect == "scramble") {
						var addTxt="";
						var rpt = scramblePref[i].len - scramblePref[i].pos - 1;
						for(s=0;s<rpt;s++){
							randomNum = Math.floor(Math.random()*textToSwap.length)
							addTxt += textToSwap[randomNum];
						}
						tmpTxt = tmpTxt.substring(0, scramblePref[i].pos) + addTxt;
					} else if (options.effect == "simple") {
						tmpTxt = tmpTxt.substring(0, scramblePref[i].pos);
					}
					
					$(this).html(tmpTxt);
					
					if (scramblePref[i].pos == scramblePref[i].len) {
						count++;
					}
				}
						
			})
			if (count == total) {
				clearInterval(timer);
			}
		}
	}
})(jQuery);

