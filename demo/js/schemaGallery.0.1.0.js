(function ( $ ) {
 
    $.fn.schemaGallery = function( options ) {
 				var defaults = {
 					slideAnimation: 2000,
          boxAnimation: 500,
          height: 550
 				}
 				
        // This is the easiest way to have default options.
        var settings = $.extend(defaults, options);
        $height = settings.height + "px";
        $height_schemaItem = (settings.height - 20) + "px";
        $schema_item_count = settings.schemaItems.length;

				$ul_width = this.width();
				
				$margin = "0.3%";
				$space = 0.3 * ($schema_item_count * 2);
				
				$actual_space = 100 - $space.toFixed(3);

				$schemaItem_main_size = ($actual_space.toFixed(3)/$schema_item_count)+"%";

        // create DOM for schemaGallery
        var objWrapper = $('<div id="schemaWrapper"></div>');
        objWrapper.css({'height': $height, 'max-height': $height});
        var objUl = $('<ul id="schemaAccordian"></ul>');
        objUl.css({'height': $height});
        objWrapper.append(objUl);

        $.each(settings.schemaItems, function(index, item){
        	var objli =  $('<li class="schemaItem" style="background: url('+ item.backgroundImageUrl +');"></li>');
        	objli.css({'width': $schemaItem_main_size, 'margin-left': $margin, 'margin-right': $margin, 'height': $height_schemaItem});
        	var objTransBox = $('<div class="transbox"></div>');
        	objTransBox.append("<h3>"+item.infoBoxTitle+"</h3><p>"+item.infoBoxDescription+"</p>");
        	objli.append(objTransBox);
        	objli.append('<div class="bottom_text"><h4>'+item.bottomText+'</h4></div>')
        	objUl.append(objli);
        });
        
        this.append(objWrapper);

				// after slide scale size of schemaItem
				$scale_size_schemaItem = ($actual_space - 55)/($schema_item_count - 1);
 
        // By click
				$(".schemaItem").click(function(){
					if($(this).hasClass("schemaItemOpen"))
					{
						$(this).removeClass('schemaItemOpen');
						$(this).children('.transbox').slideUp(settings.boxAnimation);
						$(".bottom_text").show(settings.boxAnimation);
						$(this).animate({'width': $schemaItem_main_size, 'margin': $margin}, {duration:500, queue:false});
						$(".schemaItem").each(function(){
							$(this).removeClass('schemaItemClose');
							$(this).children('.transbox').slideUp(settings.boxAnimation);
							$(".bottom_text").show(settings.boxAnimation);
							$(this).animate({'width': $schemaItem_main_size, 'margin': $margin}, {duration:1000, queue:false});
						});
					}
					else
					{
						$that = $(this);
						$(".bottom_text").hide(settings.boxAnimation);
						$(".schemaItem").each(function(){
							if($that.get(0) == $(this).get(0))
							{
								$(this).addClass('schemaItemOpen');
								$(this).removeClass('schemaItemClose');
								$(this).stop(true).animate({'width':'55%'}, {duration:settings.slideAnimation, queue:true});
								$(this).children('.transbox').slideDown(settings.boxAnimation);
							}
							else
							{
								$(this).addClass('schemaItemClose');
								$(this).removeClass('schemaItemOpen');
								$(this).children('.transbox').slideUp(settings.boxAnimation);
								$(this).animate({'width': $scale_size_schemaItem+"%"}, {duration:500, queue:true});
							}
						});
					}
				});
    };
 
}( jQuery ));