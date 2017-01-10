/*
* Exposure (http://http://exposure.blogocracy.org/)
* Copyright 2011, Kristoffer Jelbring
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
* THE SOFTWARE.
*/
;(function($) {
	/**
	* @name Exposure
	* @author Kristoffer Jelbring (kris@blogocracy.org)
	* @version 1.0
	*
	* @type jQuery
	* @cat plugins/Media
	*
	* @desc Turn a simple HTML list into a rich and smart photo viewer that handles very large amounts of photos.
	*
	* @example $('#images').exposure({options});
	*
	* @options
	*	target:	(selector string) Where to insert the image being displayed. Defaults to '#exposure'. If no target is found, one will be created.
	*	showThumbs:	(boolean) Display thumbnails or not. Defaults to true. 
	*	showControls: (boolean) Display paging controls or not. Defaults to true, but will be set to false if missing controlsTarget or if carouselControl is set to true.
	*	imageControls: (boolean) Switch paging controls to use images instead of pages. Defaults to false.
	*	controls: (object) Display only certain paging controls. All controls default to true. Usage example: controls : { prevNext : true, pageNumbers : true, firstLast : false }
	*	carouselControls: (boolean) Enable carousel type controls instead of the classic paging type controls. Defaults to false, but will be set to false if showThumbs is also set to false.
	*	enableSlideshow: (boolean) Enable slideshow. Defaults to true.
	*	slideshowControlsTarget: (selector string) Where to insert the slideshow controls. Defaults to null.
	*	autostartSlideshow: (boolean) Automatically start the slideshow when the gallery is loaded. Defaults to false.
	*	slideshowDelay: (number) Delay for each slide in the slideshow (in milliseconds). Defauts to 3000.
	*	onSlideshowPlayed: (function) Callback funcation that is called when the slideshow is played.
	*	onSlideshowPaused: (function) Callback funcation that is called when the slideshow is paused.
	*	showCaptions: (boolean) Display captions or not. Captions are added by setting a title attribute on the items in the list.
	*	showExtraData: (boolean) Display extra image data or not. This data is added by inserting inner HTML to the items in the list.
	*	dataTarget: (selector string) Where to insert captions and extra image data. Defaults to null, in which case the data container will appended to the main Exposure target.
	*	controlsTarget: (selector string) Where to insert the paging controls. Defaults to null.
	*	onThumb: (function) Callback function that is called when a thumbnail is displayed.
	*	onImage: (function) Callback function that is called when an image is displayed. Defaults to removing the previous image.
	*	onImageHoverOver (function) Callback function that is called when the mouse enters the displayed image.
	*	onImageHoverOut (function) Callback function that is called when the mouse leaves the displayed image.
	*	onCarousel: (function) Callback function that is called right before the image carousel is updated.
	*	onNext: (function) Callback function that is called when nextImage is called.
	*	onPrev: (function) Callback function that is called when prevImage is called.
	*	onPageChanged: (function) Callback function that is called when goToPage is called. Is not called when carouselControls is set. Defaults to showing all thumbnails on the current page.
	*	onPagingLink: (function) Callback function that is called when a new paging link has been added. Defaults to returning the link.
	*	separatePageBrowsing: (boolean) Enable separate page browsing (change page without changing the image being viewed). Defaults to false.
	*	loop: (boolean) Start over when last image is reached.
	*	onEndOfLoop: (function) Callback function that is called when the last image is reached and loop option is set to false.
	*	viewFirstImage: (boolean) Enable automatic showing of the first image in the gallery when the gallery is loaded. Defaults to true.
	*	pageSize: (number) Maximum number of images (thumbnails) per page. Defaults to 5.
	*	visiblePages: (number) Maxium number of pages visible in paging.
	*	preloadBuffer: (number) Maximum number of images to keep in load queue at any given time. Defaults to 3.
	*	keyboardNavigation: (boolean) Enable keyboard navigation. Defaults to true.
	*	clickingNavigation: (boolean) Enable browsing by clicking the image being shown. Defaults to true.
	*	fixedContainerSize: (boolean) Enable a fixed size target element (set the size using CSS) instead of one that adapts to the size of the current image. Defaults to false.
	*	maxWidth: (number) Maximum image width in the gallery (larger images will be downscaled). Defaults to null.
	*	maxHeight: (number) Maximum image height in the gallery (larger images will be downscaled). Defaults to null.
	*	stretchToMaxSize: (boolean) Stretch all images to maxWidth and maxHeight. Defaults to false.
	*	fullScreen: (boolean) Stretch all images to be viewn in full screen. Defaults to false.
	*	onEnterFullScreen: (function) Callback function that is called when entering full screen mode. Defaults to showing background mask.
	*	onExitFullScreen: (function) Callback function that is called when exiting full screen mode. Defaults to hiding target and background mask.
	*	showThumbToolTip: (boolean) Display captions as thumbnail tooltips or not. Defaults to true.
	*	onEmpty: (function) Called when the gallery is empty. Defaults to removing controls and targets and to hiding the list element that the plugin is called on.
	*	onInit: (function) Called when the gallery has been initialized.
	*	allowDuplicates: (boolean) Allow the same image to be added more than once. Defaults to true.
	*	jsonSource: (JSON data string/URL to JSON data/JSON object) Load additional images from an external source using JSON. Defaults to null.
	*/
	
	// Static Exposure instance.
	$.exposure = {
		v : '1.0',
		
		// Predefined selectors.
		defaultTargetId : 'exposure',
		wrapperClass : 'exposureWrapper',
		targetClass : 'exposureTarget',
		currentImageClass : 'exposureCurrentImage',
		lastImageClass : 'exposureLastImage',
		captionClass : 'caption',
		imageDataClass : 'extra',
		dataContainerClass : 'exposureData',
		controlsClass : 'exposureControls',
		slideshowControlsClass : 'exposureSlideshowControls',
		firstPageClass : 'exposureFirstPage',
		prevPageClass : 'exposurePrevPage',
		nextPageClass : 'exposureNextPage',
		lastPageClass : 'exposureLastPage',
		pagingClass : 'exposurePaging',
		playSlideshowClass : 'exposurePlaySlideshow',
		pauseSlideshowClass : 'exposurePauseSlideshow',
		maskClass : 'exposureMask',
		thumbsClass : 'exposureThumbs',
		imageClass : 'exposureImage',
		imageHoverClass : 'exposureHover',
		selectedImageClass : 'selected',
		activeThumbClass : 'active',
		currentThumbClass : 'current',
		firstThumbClass : 'first',
		lastThumbClass : 'last',
		loadedClass : 'loaded',
		activeLinkClass : 'active',
		disabledLinkClass : 'disabled',		
		
		/**
		* Check if a variable is defined.
		*
		* @param v Variable to check.
		*/
		isDefined : function(v) {
			return typeof v !== 'undefined';
		},
		
		/**
		* Check if a variable is an object.
		*
		* @param v Variable to check.
		*/
		isObject : function(v) {
			return typeof v === 'object';	
		},
		
		/**
		* Check if a string starts with another string.
		*
		* @param s1 String to check.
		* @param s2 String to look for.
		*/
		startsWith : function(s1, s2) {
			if (s1 && s2) {
				return s1.match("^"+s2) === s2;
			}
			return false;
		},
		
		/**
		* Calculate the differance in outerwidth and width of an element.
		*
		* @param el The element to check.
		* @returns Width differance.
		*/
		widthDiff : function(el) {
			return el ? el.outerWidth(true)-el.width() : 0;
		}, 
		
		/**
		* Calculate the differance in outerHeight and height of an element.
		*
		* @param el The element to check.
		* @returns Height differance.
		*/
		heightDiff : function(el) {
			return el ? el.outerHeight(true)-el.height() : 0;
		},
		
		/**
		* Create a link and connect it to an onclick callback function.
		*
		* @param text Link text.
		* @param onClick Callback function to call when link is clicked.
		* @param linkClass Class attribute to decorate the link with.
		*/
		createLink : function(text, onClick, linkClass) {
			var a = $('<a href="javascript:void(0);"></a>').text(text).click(onClick);
			if (linkClass) {
				a.addClass(linkClass);
			}
			return a;
		},
		
		// Default texts. Use the localization files to override these.
		texts : {
			first : 'First',
			previous : 'Prev',
			next : 'Next',
			last : 'Last',
			play : 'Play slideshow',
			pause : 'Pause slideshow'
		}
	};
	
	// Default values. Override these using the options argument when invoking Exposure.
	var defaults = {
		target : '#' + $.exposure.defaultTargetId,
		showThumbs : true,
		showControls : true,
		imageControls : false,
		controls : {
			prevNext : true,
			firstLast : true,
			pageNumbers : true				
		},
		carouselControls: false,
		enableSlideshow : true,
		slideshowControlsTarget : null,
		autostartSlideshow : false,
		slideshowDelay : 3000,
		onSlideshowPlayed : function() {},
		onSlideshowPaused : function() {},
		showCaptions : true,
		showExtraData : true,
		dataTarget : null,
		controlsTarget : null,
		onThumb : function(thumb) {},
		onImage : function(image, imageData, thumb) {
			image.siblings('.' + $.exposure.lastImageClass).remove();
		},
		onImageHoverOver : function() {},
		onImageHoverOut : function() {},
		onCarousel : function(firstImage, lastImage) {},
		onNext : function() {},
		onPrev : function() {},
		onPageChanged : function() {},
		onPagingLink : function(link) {
			return link;
		},
		separatePageBrowsing : false,
		loop : true,
		onEndOfLoop : function() {},
		pageSize : 5,
		viewFirstImage : true,
		visiblePages : 5,
		preloadBuffer : 3,
		keyboardNavigation : true,
		clickingNavigation : true,
		fixedContainerSize : false,
		maxWidth : null,
		maxHeight : null,
		stretchToMaxSize : false,
		fullScreen : false,
		onEnterFullScreen : function(mask) {
			mask.show();	
		},
		onExitFullScreen : function(target, mask) {
			target.hide();
            mask.hide();		
		},
		showThumbToolTip : true,
		onEmpty : function(gallery) {
			gallery.hide();
			gallery.targetElement.remove();
			if (gallery.showControls) {
				gallery.controlsElement.remove();				
			}
			if (gallery.slideshowControlsTarget) {
				gallery.slideshowControlsElement.remove();
			}	
		},
		onInit : function() {},
		allowDuplicates : true,
		jsonSource : null
	};
	
	/**
	* Value object representing an image in the viewer.
	*
	* @param src Source to the full size image.
	* @param thumb Source to thumbnail version of the image.
	* @param caption Image caption.
	* @param data Extra image data.
	*/
	var Image = function(src, thumb, caption, data) {
		this.src = src;
		this.thumb = thumb;
		this.caption = caption;
		this.data = data;
		this.loaded = false;
	};
	
	// Primary Exposure init function. To be called on thumbnail container.
	$.fn.exposure = function(options) {
		// Shortcuts.
		var gallery = this;
		var ex = $.exposure;
		var txt = ex.texts;
		
		$.extend(this, {
			/**
			* All the images in the viewer. Holds an array of Image objects that are filled up when the plugin is loaded.
			*/
			images : [],
			
			/**
			* All the image sources that's been previously added to the viewer.
			*/
			sources : {},
			
			/**
			* Create a new Image object and add it to images array.
			*
			* @param src Source to the full size image.
			* @param thumb Source to thumbnail version of the image.
			* @param caption Image caption.
			* @param data Extra image data.
			* @returns Index of the new image.
			*/
			newImage : function(src, thumb, caption, data) {
				var alreadyAdded = ex.isDefined(gallery.sources[src]);
				if (alreadyAdded && !gallery.allowDuplicates) {
					return -1;
				}
				var image = new Image(src, thumb, caption, data);
				var imageIndex = gallery.images.push(image) - 1;
				if (!alreadyAdded) {
					gallery.sources[src] = imageIndex;
				}
				return imageIndex;
			},
			
			/**
			* Initialization flag.
			*/
			initialized : false,
					
			/**
			* Index of the image currently being viewed.
			*/
			current : -1,
			
			/**
			* Deselect the image currently being viewed.
			*/
			deselectCurrentImage : function() {
				gallery.current = -1;
				gallery.find('li.' + ex.activeThumbClass).removeClass(ex.activeThumbClass);
			},
			
			/**
			* The load queue, holds an array of indices of images to load.
			*/
			loadQueue : [],
			
			/**
			* Add an image to the load queue.
			*
			* @param index Index of image to add.
			*/
			addToLoadQueue : function(index) {
				if (!gallery.loaded(index) && !gallery.queued(index)) {
					gallery.loadQueue.push(index);
				}
			},
			
			/**
			* Check if a specific image exists in the load queue.
			*
			* @param index Index of image to check.
			*/
			queued : function(index) {
				return $.inArray(index, gallery.loadQueue) > -1;	
			},
					
			/**
			* Check if a specific image has been loaded.
			*
			* @param index Index of image to check.
			*/
			loaded : function(index) {
				var image = gallery.getImage(index);
				if (image !== null) {
					return image.loaded;
				}
				return false;
			},
			
			/**
			* Find the next, not already loaded image, in the load queue. This function is recursive and will continue until
			* an image is found, or until the queue is empty.
			*/
			nextInLoadQueue : function() {
				var i;
				if (gallery.loadQueue.length > 0) {
					var next = gallery.loadQueue.shift();
					if (gallery.loaded(next)) {				
						// Image already loaded, remove from load queue.
						i = $.inArray(next, this.loadQueue);
						gallery.loadQueue.splice(i, 1);
						
						// Find next in queue.
						return gallery.nextInLoadQueue();
					}
					return next;
				}
				return null;
			},
			
			/**
			* Preload the next image in the load queue.
			*/	
			preloadNextInQueue : function() {
				if (gallery.loadQueue.length > 0) {				
					var nextIndex = gallery.nextInLoadQueue();
					if (nextIndex !== null) {
						gallery.loadImage(nextIndex, gallery.preloadNextInQueue);
					}
				}
			},
			
			/**
			* Load a specific image.
			*
			* @param index Index of image to load.
			* @param onload Image onload callback function.
			*/
			loadImage : function(index, onload) {
				var image = gallery.getImage(index);		
				var img = $('<img />').addClass(ex.imageClass);
				var i;
				if (image !== null) {
					image.loaded = true;
					if (gallery.queued(index)) {
						// Since image already has been loaded, remove it from the load queue.
						i = $.inArray(index, gallery.loadQueue);
						gallery.loadQueue.splice(i, 1);
					}
					if (typeof onload === 'function') {
						img.load(onload);
					}
					img.attr('src', image.src);
				}
				return img;		
			},
			
			/**
			* Calculate the page number of a specific image.
			*
			* @param index Index of image to get page number for.
			*/
			pageNumberForImage : function(index) {
				return Math.ceil((index + 1) / gallery.pageSize);
			},
			
			/**
			* Calculate the total number of pages using the set page size.
			*/
			numberOfPages : function() {
				// Calculate the page number for the last image.
				return this.pageNumberForImage(gallery.images.length-1);
			},
			
			/**
			* Check if the the page currently being viewed is the first page.
			*/
			atFirstPage : function() {
				return gallery.currentPage === 1;
			},
			
			/**
			* Check if the the page currently being viewed is the last page.
			*/
			atLastPage : function() {
				return gallery.currentPage === gallery.numberOfPages();
			},
			
			/**
			* Check if a specific page number is a valid page number.
			*
			* @param page Page number to check.
			*/
			validPage : function(page) {
				return page > 0 && page <= gallery.numberOfPages();
			},
			
			/**
			* Create paging links.
			*/
			createPaging : function() {	
				var i;
				if (gallery.showControls && gallery.controls.pageNumbers) {	
					// Create paging links.
					var stop = gallery.imageControls ? gallery.numberOfImages() : gallery.numberOfPages();
					gallery.controlsElement.find('.' + ex.pagingClass).each(function() {
						for (i = 1; i <= stop; i++) {
							$(this).append(gallery.newPagingLink(i));
						}
					});
				}	
			},
			
			/**
			* Update paging links.
			*/
			updatePaging : function(newActivePage) {
				if (gallery.showControls && gallery.controls.pageNumbers) {
					var current = gallery.imageControls ? gallery.current+1 : gallery.currentPage;
					var paging = gallery.controlsElement.find('.' + ex.pagingClass);
					paging.find(' span.' + ex.activeLinkClass).each(function() { 
						$(this).replaceWith(gallery.newPagingLink(current)); 
					});
					paging.find('a[rel="' + newActivePage + '"]').each(function() { 
						$(this).replaceWith($('<span>' + newActivePage + '</span>').addClass(ex.activeLinkClass)); 
					});
					var pageCount = gallery.imageControls ? gallery.numberOfImages() : gallery.numberOfPages();
					if (gallery.visiblePages > 0 && pageCount > gallery.visiblePages) {
						var firstVisiblePage = newActivePage;						
						var lastVisiblePage = gallery.visiblePages;
						var flooredVisiblePages = Math.floor(gallery.visiblePages/2);
						if (newActivePage <= flooredVisiblePages) {
							firstVisiblePage = 1;							
						} else if (newActivePage > (pageCount - flooredVisiblePages)) {
							lastVisiblePage = pageCount;
							firstVisiblePage = lastVisiblePage - gallery.visiblePages + 1;
						} else { 
							firstVisiblePage -= flooredVisiblePages;
							lastVisiblePage = firstVisiblePage + gallery.visiblePages - 1;
						}
						paging.each(function() {	
							$(this).children().each(function(i) {
								var currentPage = i+1;
								if (currentPage >= firstVisiblePage && currentPage <= lastVisiblePage) {
									$(this).show();
								} else {
									$(this).hide();
								}
							});
						});
					}	
				}
			},
			
			/**
			* Create a new paging link for a specific page.
			*
			* @param page Index of the image/number of the page (depending on the imageControls setting) to create the link for.
			*/
			newPagingLink : function(index) {
				var onclick = function() {
					// View the image/page defined in the rel attribute of the link.
					var rel = Number($(this).attr('rel'));
					if (gallery.imageControls) {
						gallery.viewImage(rel-1);
					} else {
						gallery.goToPage(rel);
					}
				};
				return ex.createLink(index, onclick).attr('rel', index);
			},
			
			/**
			* Get the index of the next image.
			*/
			getNextImage : function() {
				if (gallery.current === gallery.images.length-1) {
					// Is at last image, return first image.
					if (gallery.loop) {
						return 0;
					} else {
						// Loop ended callback.
						gallery.onEndOfLoop();	
					}					
				} else {
					// Return next image.
					return gallery.current+1;
				}
				return null;
			},
			
			/**
			* Get the index of the previous image.
			*/
			getPrevImage : function() {
				if (gallery.current === 0) {
					// Is at first image, return last image.
					if (gallery.loop) {
						return gallery.images.length-1;
					}
				} else {					
					// Return previous image. 
					return gallery.current-1;
				}
				return null;
			},
			
			/**
			* Number of the page currently being viewed.
			*/
			currentPage : 1,
			
			/**
			* View a specific page.
			*
			* @param page Number of the page to view.
			* @param imageToView Index of the image to view (defaults to viewing first image on page if this parameter isn't set).
			*/
			goToPage : function(page, imageToView) {
				if (this.validPage(page)) {
					// Hide all thumbnail containers.
					gallery.find('li').removeClass(ex.currentThumbClass).hide();
					
					gallery.loadPage(page, imageToView);
					
					if (!gallery.imageControls) {
						gallery.updatePaging(page);
					}
					
					gallery.currentPage = page;
					
					var disabled = ex.disabledLinkClass;
					if (gallery.showControls) {			
						if (gallery.atFirstPage()) {
							// Disable first page button.
							if (gallery.controls.firstLast) {
								gallery.find('.' + ex.firstPageClass).addClass(disabled);
							}
							
							// Hide previous page button.
							if (!gallery.loop && gallery.controls.prevNext) {
								gallery.find('.' + ex.prevPageClass).hide();
							}
						} else {
							// Enable first page button.
							if (gallery.controls.firstLast) {
								gallery.find('.' + ex.firstPageClass).removeClass(disabled);
							}
							
							// Show previous page button.
							if (!gallery.loop && gallery.controls.prevNext) {
								gallery.find('.' + ex.prevPageClass).show();
							}
						}
						if (gallery.atLastPage()) {
							// Disable last page button.
							if (gallery.controls.firstLast) {
								gallery.find('.' + ex.lastPageClass).addClass(disabled);
							}
							
							// Hide next page button.
							if (!gallery.loop && gallery.controls.prevNext) {
								gallery.find('.' + ex.nextPageClass).hide();
							}
						} else {
							// Enable last page button.
							if (gallery.controls.firstLast) {
								gallery.find('.' + ex.lastPageClass).removeClass(disabled);
							}
							
							// Show next page button.
							if (!gallery.loop && gallery.controls.prevNext) {			
								gallery.find('.' + ex.nextPageClass).show();
							}
						}
					}
					
					// Page changed callback.
					if (!gallery.carouselControls) {
						// Reset height of thumbs on current page.
						gallery.find('li.' + ex.currentThumbClass).show().each(function(i) {
							var imageHeight = $(this).find('img').height();
							if (imageHeight > 0) {
								$(this).height(imageHeight);
							}
						});
						
						gallery.onPageChanged(gallery);
					}
				}
			},
			
			/**
			* Load a specific page.
			*
			* @param page Number of the page to load.
			* @param imageToView Index of the image to view (defaults to viewing first image on page if this parameter isn't set).
			*/
			loadPage : function(page, imageToView) {
				if (gallery.validPage(page)) {
					
					// Calculate first and last images on this page.
					var last = page * gallery.pageSize;
					var first = last - gallery.pageSize;
					
					if (last > gallery.images.length) {
						last = gallery.images.length;
					}
			
					gallery.pageTransition = true;
					
					gallery.viewThumbs(first, last-1);
					
					if (!gallery.separatePageBrowsing) {
						if (imageToView) {
							// Moving backwards, set the last image on the page as active.
							gallery.viewImage(imageToView);
						} else {
							if (page > 1 || ((page === 1 && gallery.viewFirstImage) || gallery.initialized)) {
								// Set the first image on this page as active.			
								gallery.viewImage(first);
							}
						}
					}
					
					gallery.pageTransition = false;
				}
			},
			
			/**
			* Views thumbnails for a specific set of images (and creates them if needed).
			*
			* @param first Index of the first image to view.
			* @param last Index of the last image to view.
			*/
			viewThumbs : function(first, last) {
				var i;
				if (gallery.showThumbs) {
					// Go through images in set.
					for (i = first; i <= last; i++) {
						gallery.viewThumb(i, i === first, i === last, true);
				    }
				    
				    if (!gallery.carouselControls && gallery.currentPage < gallery.numberOfPages()) {				
						// Preload next page of thumbnails.
					    var firstNext = last+1;
					    var lastNext = last+gallery.pageSize;
					    if (lastNext >= gallery.images.length) {
							lastNext = gallery.images.length-1;
						}
					    
					    for (i = firstNext; i <= lastNext; i++) {
							var container = gallery.viewThumb(i, i === firstNext, i === lastNext, false);
							if (container && container.length) {
								container.hide();
							}
					    }
				    }
				}
			},
			
			/**
			* View thumbnail for a specific image (and create it if needed).
			*
			* @param index Index of the image to view.
			* @param first If the image is the first on the page.
			* @param last If the image is the last on the page.
			* @param current If the image is a part of the current page.
			*/
			viewThumb : function(index, first, last, currentPage) {
				// Make sure image index is in scope.
			    if (index < 0) {
			        index = gallery.images.length + index;
			    } else if (index >= gallery.images.length) {
			        index = index - gallery.images.length;
			    }
			
			    var image = gallery.images[index];
			    // Find thumbnail container.
			    var container = gallery.getThumb(index).parent();
			    if (!container.length) {
			        // Create a thumbnail if one doesn't already exist.
			        container = gallery.createThumbForImage(image, index);
			        
			        // Add page number as rel attribute.
			        container.attr('rel', gallery.pageNumberForImage(index));
			    }
			    if (container.length) {
			        // Append in the end of the container in order to save the ordering of the images.
			        container.parent().append(container);
			
			        if (first) {
			            // Decorate thumbnail container for first image on page.
			            container.addClass(ex.firstThumbClass);
			        } else {
			            container.removeClass(ex.firstThumbClass);
			        }
			        if (last) {
			            // Decorate thumbnail container for last image on page.
			            container.addClass(ex.lastThumbClass);
			        } else {
			            container.removeClass(ex.lastThumbClass);
			        }
			        if (currentPage) {
						if (gallery.carouselControls) {
							container.show();
						} else {
							container.addClass(ex.currentThumbClass);	
						}
			        }
			    }
			    
			    return container;	
			},
			
			/**
			* Get the thumbnail img element for a specific image.
			*
			* @param index Index of image to find thumbnail for.
			*/
			getThumb : function(index) {
				return gallery.find('img[rel="'+index+'"]');
			},
			
			/**
			* Create a thumbnail for a specific image.
			*
			* @param image Image object for the image.
			* @param image Index of the image.
			*/
			createThumbForImage : function(image, index) {
				if (gallery.showThumbs) {
					var thumb = gallery.getThumb(index);
			
					if (thumb === null || !thumb.length) {						
						// Create thumbnail container.
						var container = $('<li></li>');
						gallery.append(container);
						
						// Create thumbnail img element.
						thumb = $('<img />');
						
						if (image.thumb) {
							thumb.attr('src', image.thumb);
						} else {
							// Create a thumbnail from the original image.
							thumb.attr('src', image.src);
							
							// Downscale the new thumbnail.
							var imageWidth = Math.ceil(thumb.width() / thumb.height() * container.height());
							var imageHeight = Math.ceil(thumb.height() / thumb.width() * container.width());		
							if (imageWidth < imageHeight) {
								thumb.css({height: 'auto', maxWidth: container.width()});
							} else {
								thumb.css({width: 'auto', maxHeight: container.height()});
							}
						}
						
						container.append(thumb.css('display', 'block'));					
						
						// Add image index and caption as attributes.
						thumb.attr('rel', index);
						if (image.caption && gallery.showThumbToolTip) {
							thumb.attr('title', image.caption);
						}
						
						// Save extra image data in thumbnail data.
						thumb.data('data', image.data);
						
						thumb.click(function() {
							// When a thumbnail is clicked, view full version of that image.
							gallery.viewImage(Number($(this).attr('rel')));
						});
						
						thumb.load(function() {
							// Set the height of the thumbnail container to the height of the thumbnail.
							var imageHeight = $(this).height();
							if (imageHeight > 0) {
								$(this).parent().height(imageHeight);
							}		
						});
						
						gallery.onThumb(thumb);
						
						return container;
					}
				}
				return null;
			},
			
			/**
			* View the first page.
			*/
			firstPage : function() {
				if (!gallery.atFirstPage()) {
					gallery.goToPage(1);
				}	
			},
			
			/**
			* View the last page.
			*/
			lastPage : function() {
				if (!gallery.atLastPage()) {
					gallery.goToPage(gallery.numberOfPages());
				}	
			},
			
			/**
			* View the previous page.
			*/
			prevPage : function() {
				if (!gallery.atFirstPage()) {
					// Go to previous page.
					gallery.goToPage(gallery.currentPage-1);
				} else if (gallery.loop) {
					// At first page, go to last page.
					gallery.goToPage(gallery.numberOfPages());
				}	
			},
			
			/**
			* View the next page.
			*/
			nextPage : function() {
				if (!gallery.atLastPage()) {
					// Go to next page.
					gallery.goToPage(gallery.currentPage+1);
				} else if (gallery.loop) {
					// At last page, go back to first page.
					gallery.goToPage(1);
				}	
			},
			
			/**
			* Check if an image is the first image on its page.
			*
			* @param index Index of image to check. Will default to image currently being viewed if not set. 
			*/
			firstImageOnPage : function(index) {
				if (!index) {
					index = gallery.current;
				}
				return gallery.pageSize === 1 || (index % gallery.pageSize === 0);
			},
			
			/**
			* Check if the an image is the last image on its page.
			*
			* @param index Index of image to check. Will default to image currently being viewed if not set. 
			*/
			lastImageOnPage : function(index) {
				if (!index) {
					index = gallery.current;
				}
				var imageCount = gallery.images.length;
				if (gallery.pageSize === 1 || imageCount === 1) {
					return true;	
				}
				if (index > 0) {
					var currentPageSize = gallery.pageSize;
					var currentPage = gallery.pageNumberForImage(index);
					if (currentPage === gallery.numberOfPages()) {
						// Calculate the size of the last page as it may differ from the set page size.
						var newPageSize = imageCount % gallery.pageSize;
						if (newPageSize > 0) {
							currentPageSize = newPageSize;
						}
					}
					
					var imageIndex = index;
					if (currentPage > 1) {
						imageIndex -= (currentPage-1) * gallery.pageSize;
					}
					
					// Check if the current image is the last image of the current page.				
					return (imageIndex+1) % currentPageSize === 0;
				}
				return false;
			},
			
			/**
			* Get the number of the current page.
			*/
			currentPageNumber : function() {
				return gallery.currentPage;
			},
			
			/**
			* Get the number of images.
			*/
			numberOfImages : function() {
				return gallery.images.length;	
			},
			
			/**
			* Check if the image currently being viewed is the first image.
			*/
			atFirstImage : function() {
				return gallery.current === 0; 
			},
			
			/**
			* Check if the image currently being viewed is the last image.
			*/
			atLastImage : function() {
				return gallery.current === gallery.numberOfImages()-1;
			},
			
			/**
			* Get a spefic image object from the images array.
			*
			* @param index Index of image to get.
			*/
			getImage : function(index) {
				if (index !== null && index > -1 && index < gallery.images.length) {
					return gallery.images[index];
				}
				return null;
			},
			
			/**
			* Get the index of the image with the specified image source.
			*
			* @param src Source of the image to get index for.
			*/
			indexOfImage : function(src) {
				if (src && ex.isDefined(gallery.sources[src])) {
					return gallery.sources[src];
				}
				return -1;
			},
			
			/**
			* Get the index of the current image.
			*/
			currentImage : function() {
				return gallery.current;
			},
	
			/**
			* Dynamically add an image to the gallery. 
			*
			* @param src Source to the full size image.
			* @param thumb Source to thumbnail version of the image.
			* @param caption Image caption.
			* @param data Extra image data.
			*/		
			addImage : function(src, thumb, caption, data) {
				var pageCount = gallery.numberOfPages();				
				var index = gallery.newImage(src, thumb, caption, data);
				if (index > -1) {
					var pageNumber = gallery.pageNumberForImage(index);
					var containers = $('.' + ex.thumbsClass +' li[rel="'+ pageNumber + '"]');
					if (containers.length) {
						containers.removeClass(ex.lastThumbClass);
					}
					
					// Recreate paging if a new page needs to be added.
					var newPageAdded = pageNumber > pageCount;
					if (newPageAdded) {
						// Make sure paging container is empty.
						$('.' + ex.pagingClass).empty();
						
						gallery.createPaging();
					}
					
					if (newPageAdded || pageNumber === gallery.currentPage) {
						// Reload the current page.
						gallery.goToPage(gallery.currentPage);	
					}
				}
			},
		
			/**
			* Dynamically remove a specific image from the gallery.
			*
			* @param index Index of image to remove.
			*/
			removeImage : function(index) {
				if (gallery.images.length === 1) {
					gallery.removeAllImages();
				} else {
					if (gallery.enableSlideshow) {
						gallery.pauseSlideshow();	
					}
					
					var oldPageCount = gallery.numberOfPages();
					
					// Remove the image from the list of images.
					gallery.images.splice(index, 1);
					
					// Remove the image from the loadQueue.
					var queueIndex = $.inArray(index, gallery.loadQueue);
					if (queueIndex > -1) {
						gallery.loadQueue.splice(queueIndex, 1);
					}
				
					// Remove thumbnail and container.
					var container = gallery.getThumb(index).parent();
					container.remove();
				
					// Update thumbnail containers.
					$('.' + ex.thumbsClass + ' > li').each(function(i) {
						if (i >= index) {
							// Update page number in rel attribute.
							var newRel = gallery.pageNumberForImage(i);
							$(this).attr('rel', newRel);
							
							// Update index number in rel attribute of image.
							$(this).find('img').attr('rel', i);
							
							// Update first/last classes
							if (gallery.firstImageOnPage(i)) {
								$(this).addClass(ex.firstThumbClass);	
							} else {
								$(this).removeClass(ex.firstThumbClass);	
							}
							if (gallery.lastImageOnPage(i)) {
								$(this).addClass(ex.lastThumbClass);
							} else {
								$(this).removeClass(ex.lastThumbClass);
							}
							
							if (gallery.currentPage === newRel) {
								$(this).show();
							} else {
								$(this).hide();	
							}
						}
					});
					
					// Recreate paging links.
					var pageRemoved = $.exposure.numberOfPages < oldPageCount;
					if (pageRemoved) {
						// Make sure paging container is empty.
						$('.' + ex.pagingClass).empty();
						
						gallery.createPaging();
					}
					
					if (gallery.current === index) {
						// Skip to next image if the deleting image was the currently viewed image.
						gallery.current = -1;
						var nextIndex = index;
						if (index === gallery.numberOfImages()) {
							nextIndex = 0;	
						}
						gallery.viewImage(nextIndex);
					} 
				}
			},
		
			/**
			* Removes all images from the gallery. Usable when dynamically rebuilding the gallery from scratch.
			*/
			removeAllImages : function() {
				gallery.images = [];
				gallery.sources = {};
				gallery.loadQueue = [];
				if (gallery.enableSlideshow) {
					gallery.pauseSlideshow();	
				}
				$('.' + ex.thumbsClass + ', ' + '.' + ex.pagingClass).empty();
				gallery.current = -1;
			},			
			
			/**
			* View a specific image.
			*
			* @param Index of image to view.
			*/
			viewImage : function(index) {
				if (gallery.current !== index) {
					if (gallery.enableSlideshow && !gallery.slideshowTransition) {
						gallery.pauseSlideshow();
					}
					var wrapper = gallery.wrapper;
					var validImage = false;	
					var image = gallery.images[index];
					if (image) {
						var src = image.src;
						var caption = image.caption;
						var extraImageData = image.data;
										
						if (src) {
							validImage = true;
							
							var hasThumb = gallery.showThumbs;
							var thumb = null;
							if (gallery.showThumbs) {
								thumb = gallery.find('img[rel="' + index + '"]');
								hasThumb = thumb && thumb.length;
								
								// Light up active thumbnail.
								var active = ex.activeThumbClass;
								if (hasThumb) {
									thumb.parent().siblings().removeClass(active);
									thumb.parent().addClass(active);
								} else {
									gallery.find$('li.' + active).removeClass(active);
								}
							}
							
							// Show loading animation.
							wrapper.parent().removeClass(ex.loadedClass);
							if (gallery.loaded(index)) {
								// Hide loading animation if image already loaded.				
								wrapper.parent().addClass(ex.loadedClass);
							}
							
							var img = gallery.loadImage(index, function() {
								var lastImage = wrapper.find('.' + ex.imageClass);
								if (lastImage.length) {
									lastImage.removeClass(ex.currentImageClass);
									lastImage.addClass(ex.lastImageClass);
								}
								
								$(this).addClass(ex.currentImageClass);
								
								wrapper.append($(this));
								
								// Enable browsing by clicking on the image.
								if (gallery.clickingNavigation) {
									$(this).click(gallery.nextImage);
								}
								
								if (!$(this).width() || !$(this).height()) {
									// Workaround for bug caused by AdBlock plugin for Chrome and Safari: 
									// http://code.google.com/p/adblockforchrome/issues/detail?id=3701
									var i = $(this);
									var delay = setInterval(function() {
										gallery.resizeContainer(i);								
										clearTimeout(delay);
									}, 2);
								} else {	
									gallery.resizeContainer($(this));
								}
								
								// Image is supposed to be viewed in full screen.
								if (gallery.fullScreen && !gallery.infullScreen) {
									gallery.onEnterFullScreen(gallery.mask);
									gallery.infullScreen = true;
								}
								
								// Add caption and additional image data.							
								if (gallery.dataElement && gallery.dataElement.length) {
									if (gallery.showCaptions) {
										// Add caption to image data container.
										var captionContainer = gallery.dataElement.find('.' + ex.captionClass);
										if (captionContainer.length) {
											// Remove current caption from container.
											captionContainer.empty();
											if (!caption && hasThumb) {
												// Extract caption from thumbnail.
												caption	= thumb.attr('title');
											}
										}
										captionContainer.html(caption);
									}
									
									if (gallery.showExtraData) {
										// Add extra image data to image data container.
										var extraImageDataContainer = gallery.dataElement.find('.' + ex.imageDataClass);
										if (extraImageDataContainer.length) {
											// Remove current data from container.
											extraImageDataContainer.empty();
											if (!extraImageData && hasThumb) {
												// Extract data from thumbnail.
												extraImageData = thumb.data('data');
											}
											extraImageDataContainer.html(extraImageData);
										}
									}
								}
								
								// Add hover tracking to wrapper and data target.
								wrapper.hover(function() {
									// Add marker class.
									wrapper.addClass(ex.imageHoverClass);
									// Invoke callback.
									gallery.onImageHoverOver();
								}, function() { 
									// Remove marker class.
									wrapper.removeClass(ex.imageHoverClass);
									// Invoke callback.
									gallery.onImageHoverOut();
								});
																
								// Image loaded callback.
								gallery.onImage($(this), gallery.dataElement, thumb);
		
								// Preload next image.					
								gallery.preloadNextInQueue();
							});						
						}
					}
					if (!validImage) {
						wrapper.siblings().andSelf().empty();
						gallery.find('li.' + ex.activeThumbClass).removeClass(ex.activeThumbClass);	
					}
					
					if (gallery.imageControls) {
						var page = gallery.pageNumberForImage(index);
						if (gallery.currentPage !== page && !gallery.pageTransition) {
							gallery.goToPage(page, index);	
						}
						gallery.updatePaging(index+1);
					}
					
					gallery.current = index;
					
					// If using carousel controls make sure to properly update the thumbnails.
					if (gallery.carouselControls && gallery.images.length > gallery.pageSize) {
		                var firstVisibleImage = index;
		                var lastVisibleImage = gallery.pageSize-1;
		                var flooredVisibleImages = Math.floor(gallery.pageSize/2);
		
		                if (!gallery.loop && index < flooredVisibleImages) {
							firstVisibleImage = 0;
		                } else if (!gallery.loop && index >= (gallery.length - flooredVisibleImages)) {
		                    lastVisibleImage = gallery.length-1;
		                    firstVisibleImage = lastVisibleImage - gallery.pageSize+1;
		                } else {
							firstVisibleImage -= flooredVisibleImages;
		                    lastVisibleImage = firstVisibleImage + gallery.pageSize-1;
		                }
		                
		                gallery.onCarousel(firstVisibleImage, lastVisibleImage);
		            
						gallery.find('li').removeClass(ex.currentThumbClass).hide();
		                gallery.viewThumbs(firstVisibleImage, lastVisibleImage);
		                gallery.currentPage = gallery.pageNumberForImage(index);
		            }
				}
			},
			
			/**
			* View first image.
			*/
			firstImage : function() {
				if (!gallery.atFirstImage()) {
					if (gallery.separatePageBrowsing || gallery.atFirstPage()) {
						gallery.viewImage(0);
					} else {
						gallery.goToPage(1);	
					}
				}
			},
			
			/**
			* View next image.
			*/
			nextImage : function() {
				if (!gallery.separatePageBrowsing && gallery.lastImageOnPage()) {
					if (gallery.atLastPage() && gallery.loop) {
						// At the last page, go back to first page.
						gallery.goToPage(1);
					} else {
						// Go to the next page.
						gallery.goToPage(gallery.currentPage+1);
					}
					// Next image callback.
					gallery.onNext();
				} else {
					var next = gallery.getNextImage();
					if (next !== null) {
						// Select next image.
						gallery.viewImage(next);
						// Next image callback.
						gallery.onNext();	
					}
				}
				var nextNext = gallery.getNextImage();
				if (nextNext !== null) {
					// Add second next image to load queue.
					gallery.addToLoadQueue(nextNext);
				}
			},
			
			/**
			* View previous image.
			*/
			prevImage : function() {
				if (!gallery.separatePageBrowsing && gallery.firstImageOnPage()) {
					if (gallery.atFirstPage() && gallery.loop) {
						// At the first page, go to the last page.
						gallery.goToPage(gallery.numberOfPages(), gallery.numberOfImages()-1);
					} else {
						// Go to the previous page.	
						var page = gallery.currentPage-1;
						gallery.goToPage(page, page * gallery.pageSize - 1);
					}
					// Previous image callback.
					gallery.onPrev();
				} else {
					var prev = gallery.getPrevImage();
					if (prev !== null) {
						// Select next image.
						gallery.viewImage(prev);
						// Previous image callback.
						gallery.onPrev();
					}
				}
				var prevPrev = gallery.getPrevImage();
				if (prevPrev !== null) {
					// Add second previous image to load queue.
					gallery.addToLoadQueue(prevPrev);
				}
			},
			
			/**
			* View last image.
			*/
			lastImage : function() {
				if (!gallery.atLastImage()) {
					if (gallery.separatePageBrowsing || gallery.atLastPage()) {
						gallery.viewImage(gallery.numberOfImages()-1);
					} else {
						gallery.goToPage(gallery.numberOfPages(), gallery.numberOfImages()-1);	
					}
				}
			},
			
			/**
			* Check if the current image has any displayed caption or additional image data.
			*/
			imageHasData : function() {
				if (gallery.dataElement && gallery.dataElement.length) {
					var caption = gallery.dataElement.find('.' + $.exposure.captionClass).html();
					var extra = gallery.dataElement.find('.' + $.exposure.imageDataClass).html();
					return (caption && caption.length > 0) || (extra && extra.length > 0);
				}
				return false;
			},
			
			/**
			* Page transition state.
			*/
			pageTransition : false,
							
			/**
			* Slideshow playing state.
			*/
			playingSlideshow : false,
					
			/**
			* Holds the timer for the slideshow.
			*/
			slideshowTimer : null,
					
			/**
			* Slideshow transition state.
			*/
			slideshowTransition : false,
			
			/**
			* Recursive function that runs nextImage() after given delay. Don't use this directly, use playSlideshow() instead.
			*/		
			slideshow : function() {
				gallery.slideshowTimer = setTimeout(function() { 
					gallery.slideshowTransition = true;
					gallery.nextImage(); 
					gallery.slideshowTransition = false;
					gallery.slideshow(); 
				}, gallery.slideshowDelay);
			},
			
			/**
			* Play the slideshow.
			*/		
			playSlideshow : function() {
				if (!gallery.playingSlideshow) {
					if (gallery.slideshowControlsTarget) {
						gallery.slideshowControlsElement.find('.' + ex.playSlideshowClass).hide();
						gallery.slideshowControlsElement.find('.' + ex.pauseSlideshowClass).show();
					}
					gallery.slideshow();
					gallery.playingSlideshow = true;		
				}
				gallery.onSlideshowPlayed();			
			},
			
			/**
			* Pause the slideshow.
			*/
			pauseSlideshow : function() {
				if (gallery.playingSlideshow) {
					if (gallery.slideshowControlsTarget) {
						gallery.slideshowControlsElement.find('.' + ex.playSlideshowClass).show();
						gallery.slideshowControlsElement.find('.' + ex.pauseSlideshowClass).hide();
					}
					gallery.playingSlideshow = false;
					if (gallery.slideshowTimer) {
						clearTimeout(gallery.slideshowTimer);
					}
					gallery.onSlideshowPaused();
				}
			},
			
			/**
			* Toggle (play/pause)
			*/
			toggleSlideshow : function() {
				if (gallery.playingSlideshow) {
					gallery.pauseSlideshow();
				} else {
					gallery.playSlideshow();
				}
			},
			
			/**
			* Go to first image/page depending on imageControls setting.
			*/
			first : function() {
				if (gallery.imageControls) {
					gallery.firstImage();	
				} else {
					gallery.firstPage();
				}
			},
			
			/**
			* Go to previous image/page depending on imageControls setting.
			*/
			prev : function() {
				if (gallery.imageControls) {
					gallery.prevImage();	
				} else {
					gallery.prevPage();
				}
			},
			
			/**
			* Go to next image/page depending on imageControls setting.
			*/
			next : function() {
				if (gallery.imageControls) {
					gallery.nextImage();	
				} else {
					gallery.nextPage();
				}
			},
			
			/**
			* Go to last image/page depending on imageControls setting.
			*/
			last : function() {
				if (gallery.imageControls) {
					gallery.lastImage();	
				} else {
					gallery.lastPage();
				}
			},
			
			/**
			* Full screen state.
			*/
			infullScreen : false,
			
			/**
			* Leave full screen mode.
			*/
			exitFullScreen : function() {
				if (gallery.infullScreen) {
					gallery.pauseSlideshow();
					gallery.deselectCurrentImage();
					gallery.onExitFullScreen(gallery.targetElement, gallery.mask);
					gallery.infullScreen = false;
				}
			},
			
			/**
			* Calculate actual max width (subtract padding, margin and borders of image and container),
			*/
			actualMaxWidth : function(image, target) {
				return gallery.maxWidth ? gallery.maxWidth-(ex.widthDiff(image)+ex.widthDiff(target)) : 0;
			},
			
			/**
			* Calculate actual max height (subtract padding, margin and borders of image and container),
			*/
			actualMaxHeight : function(image, target) {
				return gallery.maxHeight ? gallery.maxHeight-(ex.heightDiff(image)+ex.heightDiff(target)) : 0;
			},
			
			/**
			* Fix image to max size.
			*/
			fitToMaxSize : function(image) {
				var target = gallery.targetElement;
				if (gallery.stretchToMaxSize) {
					if (gallery.maxWidth) {
						// Stretch to maxWidth.
						image.width(gallery.actualMaxWidth(image, target));
					}
					if (gallery.maxHeight) {
						// Stretch to maxHeight.
						image.height(gallery.actualMaxHeight(image, target));	
					}							
				} else {
					if (image.width() > image.height()) {
						// Landscape format image, fit to width first.
						gallery.fitToMaxWidth(image, target);
						gallery.fitToMaxHeight(image, target);
					} else if (image.height() > image.width()) {
						// Portrait format image, fit to height first.
						gallery.fitToMaxHeight(image, target);
						gallery.fitToMaxWidth(image, target);
					} else {
						// Square format image.
						var actualMaxHeight = gallery.actualMaxHeight(image, target);
						var smallest = gallery.actualMaxWidth(image, target);
						if (!smallest || (actualMaxHeight && smallest && actualMaxHeight < smallest)) {
							smallest = actualMaxHeight;
						}
						if (smallest && image.width() > smallest) {
							image.width(smallest);
							image.height(smallest);
						}
					}
				}	
			},
			
			/**
			* Center main image in window.
			*/
			centerImageInWindow : function(image) {
				var target = gallery.targetElement;
				target.width(image.width()).height(image.height());			
				target.css({
					'top' :  ($(window).height()-target.outerHeight(true))/2, 
					'left' : ($(window).width()-target.outerWidth(true))/2
				});
				
				target.find('.' + ex.lastImageClass).each(function() {
					$(this).css({
						'top' :  (target.height()-$(this).height())/2, 
						'left' : (target.width()-$(this).width())/2
					});
				});
			},
			
			/**
			* Fit images to window (used in full screen mode).
			*/
			fitToWindow : function() {
				gallery.maxWidth = $(window).width();
				gallery.maxHeight = $(window).height();
				var image = gallery.targetElement.find('.' + $.exposure.currentImageClass).width('auto').height('auto');
				gallery.fitToMaxSize(image);
				
				if (!image.width() || !image.height()) {
					// Workaround for bug caused by AdBlock plugin for Chrome and Safari: 
					// http://code.google.com/p/adblockforchrome/issues/detail?id=3701
					var delay = setInterval(function() {
						gallery.centerImageInWindow(image);
						clearTimeout(delay);
					}, 2);
				} else {	
					gallery.centerImageInWindow(image);
				}
			},
			
			/**
			* Fit image to maxWidth.
			*/
			fitToMaxWidth : function(image, target) {
				var actualMaxWidth = gallery.actualMaxWidth(image, target);
				if (actualMaxWidth && image.width() > actualMaxWidth) {
					// Calculate new height to maintain aspect ratio.								
					var newHeight = Math.round(actualMaxWidth * image.height()/image.width());
					image.height(newHeight);
					// Shrink to maxWidth.	
					image.width(actualMaxWidth);										
				}
			},
			
			/**
			* Fit image to maxHeight.
			*/
			fitToMaxHeight : function(image, target) {	
				var actualMaxHeight = gallery.actualMaxHeight(image, target);
				if (actualMaxHeight && image.height() > actualMaxHeight) {
					// Calculate new width to maintain aspect ratio.								
					var newWidth = Math.round(actualMaxHeight * image.width()/image.height());
					image.width(newWidth);
					// Shrink to maxHeight.
					image.height(actualMaxHeight);
				}
			},
			
			/**
			* Resize target container element to fit image.
			*/
			resizeContainer : function(img) {
				// Resize image according to maxWidth and maxHeight settings.
				gallery.fitToMaxSize(img);
				
				// Resize target element to fit image.
				if (!gallery.fixedContainerSize) {
					gallery.targetElement.show().width(img.width()).height(img.height());
				}
			}
		});
		
		// Append options.
		$.extend(this, defaults, options);
		
		// Define target element.
		this.targetElement = $(this.target);
		if (!this.targetElement.length) {
			// The target element is missing so it needs to be created.
			this.target = defaults.target;
			this.targetElement = $('<div id="' + ex.defaultTargetId + '"></div>').insertBefore($(this));	
		}
		
		// Insert wrapper elment.
		var w = this.wrapper = $('<div class="' + ex.wrapperClass + '"></div>');
		var te = this.targetElement.addClass(ex.targetClass).append(w);
		
		if (this.showCaptions || this.showExtraData) {
			// Determine which image data to display (caption and/or additional data).
			var dataElementsHtml = '';
			if (this.showCaptions) {
				dataElementsHtml += '<div class="' + ex.captionClass + '"></div>';
			}
			if (this.showExtraData) {
				dataElementsHtml += '<div class="' + ex.imageDataClass + '"></div>';
			}
			
			// Append image data container.
			var dataElements = $(dataElementsHtml);
			if (dataElements.length) {
				this.dataElement = $(this.dataTarget);
				if (this.dataTarget && this.dataElement.length) {
					// Append data elements to image data container element.
					this.dataElement.addClass(ex.dataContainerClass).append(dataElements);
				} else {
					// Missing target element for image data. Append to main target element instead.
					this.dataElement = $('<div class="' + ex.dataContainerClass + '"></div>');
					te.append(this.dataElement.append(dataElements));
				}
			}
		}
		
		// Don't use carousel controls if not showing thumbs.
	    if (!this.showThumbs) {
	        this.carouselControls = false;
	    }
	    
	    // Don't show paging controls if using carousel controls, or if there is no controls target or if all individual controls have been turned off.
		if (this.carouselControls || !this.controlsTarget || (!this.controls.prevNext && !this.controls.firstLast && !this.controls.pageNumbers)) {
			this.showControls = false;
		}
		
		// Render controls.
		if (this.showControls) {
			this.controlsElement = $(this.controlsTarget).addClass(ex.controlsClass).each(function() {
				if (gallery.controls.firstLast) { $(this).append(ex.createLink(txt.first, gallery.first, ex.firstPageClass)); }
				if (gallery.controls.prevNext) { $(this).append(ex.createLink(txt.previous, gallery.prev, ex.prevPageClass)); }
				if (gallery.controls.pageNumbers) { $(this).append($('<div class="' + ex.pagingClass + '"></div>')); }
				if (gallery.controls.prevNext) { $(this).append(ex.createLink(txt.next, gallery.next, ex.nextPageClass)); }
				if (gallery.controls.firstLast) { $(this).append(ex.createLink(txt.last, gallery.last, ex.lastPageClass)); }
			});
		}
		
		// Only render slideshow controls if there is a slideshow controls target.
		if (this.enableSlideshow && this.slideshowControlsTarget) {
			this.slideshowControlsElement = $(this.slideshowControlsTarget).addClass(ex.slideshowControlsClass).each(function() {
				$(this).append(ex.createLink(txt.play, gallery.playSlideshow, ex.playSlideshowClass));
				$(this).append(ex.createLink(txt.pause, gallery.pauseSlideshow, ex.pauseSlideshowClass).hide());
			});
		}
		
		// Bind keys for navigation (using Hotkeys Plugin).
		if (this.keyboardNavigation) {
			if (this.carouselControls) {
				$(document).bind('keyup', 'left', this.nextImage);
				$(document).bind('keyup', 'right', this.prevImage);
			} else {		
				$(document).bind('keyup', 'left', this.prevImage);
				$(document).bind('keyup', 'right', this.nextImage);
				$(document).bind('keyup', 'ctrl+left', this.prevPage);
				$(document).bind('keyup', 'ctrl+right', this.nextPage);
				$(document).bind('keyup', 'up', this.lastImage);
				$(document).bind('keyup', 'down', this.firstImage);
				$(document).bind('keyup', 'ctrl+up', this.lastPage);
				$(document).bind('keyup', 'ctrl+down', this.firstPage);
			}
			if (this.enableSlideshow) {
				$(document).bind('keyup', 'space', this.toggleSlideshow);
			}
		}
		
		// Prepare for full screen/modal window mode.
		if (this.fullScreen) {
			$(window).resize(this.fitToWindow);
			this.mask = $('<div class="' + ex.maskClass + '"></div>').click(this.exitFullScreen).insertAfter(this.target);
			if (this.keyboardNavigation) {
				$(document).bind('keyup', 'esc', this.exitFullScreen);
			}
		}
		
		// Prepare loading off additional images using JSON.
		var jsonImages = null;
		if (this.jsonSource) {
			if (ex.isObject(this.jsonSource)) {
				jsonImages = this.jsonSource;
			} else if (this.jsonSource.length) {
				if (ex.startsWith(this.jsonSource, "http://") || ex.startsWith(this.jsonSource, "https://")) {
					// Fetch JSON images using AJAX from specified URL source.
					jsonImages = $.ajax({url : this.jsonSource,
						type : 'GET', 
						async : false
					}).responseText;
				} else {
					jsonImages = this.jsonSource;	
				}
			}
		}
		
		// Return invoked element, to remain chainability.
		return this.addClass(ex.thumbsClass).each(function() {
			var i;
			if (jsonImages) {
				var images = ex.isObject(jsonImages) ? jsonImages : $.parseJSON(jsonImages);
				if (images && images.data) {
					// Append images fetched from JSON source to the list of images.
					for (i in images.data) {
						var photo = images.data[i];
						if (photo.source && photo.source.length) {
							var item = $('<li></li>');
							var link = $('<a></a>').attr('href', photo.source);
							if (photo.thumb_source && photo.thumb_source.length) {
								var thumb = $('<img />').attr('src', photo.thumb_source);
								if (photo.caption && photo.caption.length) {
									thumb.attr('title', photo.caption);
								}
								link.append(thumb);
							} else if (photo.caption && photo.caption.length) {
								link.attr('title', photo.caption);
							}
							item.append(link);					
							if (photo.extra_data && photo.extra_data.length) {
								item.append($(photo.extra_data));
							}
							$(this).append(item);	
						}
					}
				}
			}
			
			var foundImage = false;
			var foundThumb = false;
		
			if ($(this).children('li').length) {
				var selectedIndex = null;
				
				// Iterate over list of images.
				$(this).show().children('li').each(function() {
					foundImage = true;
					
					// The a tag contains all the needed information about the image.
					var a = $(this).find('a');
					if (a.length) {
						// Use only the first matching link.
						a = $(a[0]);
								
						var src = a.attr('href');
						var img = a.find('img');
						
						// Get caption and thumbnail source from either nested img tag or from rel attribute.
						var thumbSrc = img.length ? img.attr('src') : a.attr('rel');		
						var caption = img.length ? img.attr('title') : a.attr('title');
						
						var isSelected = a.hasClass(ex.selectedImageClass) && !selectedIndex;
											
						// Remove link and extract additional image data.
						a.remove();		
						var thumbData = $(this).html();
						
						if (thumbSrc) {
							foundThumb = true;
						}
						
						// All information extracted, remove original list entry.
						$(this).remove();
						
						// Add image to list of images.
						var imageIndex = gallery.newImage(src, thumbSrc, caption, thumbData);
						
						if (imageIndex > -1) {
							if (isSelected) {
								selectedIndex = imageIndex;
							}
							
							if (gallery.loadQueue.length < gallery.preloadBuffer) {
								// Preload buffer hasn't been filled yet, add image to load queue.				
								gallery.addToLoadQueue(imageIndex);
							}
						}
					} else {
						// Just remove this empty entry.
						$(this).remove();
					}
				});
				
				if (!gallery.showThumbs) {
					// Thumbnails are turned off, change page size to 1.
					gallery.pageSize = 1;
					
					// Remove the thumbnails container.
					$(ex.thumbsClass).remove();
				}
			
				if (foundImage) {
					// Start preloading the first image.
					gallery.preloadNextInQueue();
					
					gallery.createPaging();
					
					if (selectedIndex) {
						gallery.goToPage(gallery.pageNumberForImage(selectedIndex));
						gallery.viewImage(selectedIndex);
					} else {				
						// View the first page (and the first image).
						gallery.goToPage(1);
					}
					
					// Autostart slideshow, if enabled.
					if (gallery.enableSlideshow && gallery.autostartSlideshow) {
						gallery.playSlideshow();
					}
				} else {
					// No image found, gallery is empty.
					gallery.onEmpty(gallery);	
				}
			} else {
				// Gallery is empty.
				gallery.onEmpty(gallery);
			}
			
			gallery.onInit();
			gallery.initialized = true;
		});
	};	
})(jQuery);

/*
* jQuery Hotkeys Plugin
* Copyright 2010, John Resig
* Dual licensed under the MIT or GPL Version 2 licenses.
*
* Based upon the plugin by Tzury Bar Yochay:
* http://github.com/tzuryby/hotkeys
*
* Original idea by:
* Binny V A, http://www.openjs.com/scripts/events/keyboard_shortcuts/
*/
(function(jQuery){jQuery.hotkeys={version:"0.8",specialKeys:{8:"backspace",9:"tab",13:"return",16:"shift",17:"ctrl",18:"alt",19:"pause",20:"capslock",27:"esc",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",45:"insert",46:"del",96:"0",97:"1",98:"2",99:"3",100:"4",101:"5",102:"6",103:"7",104:"8",105:"9",106:"*",107:"+",109:"-",110:".",111:"/",112:"f1",113:"f2",114:"f3",115:"f4",116:"f5",117:"f6",118:"f7",119:"f8",120:"f9",121:"f10",122:"f11",123:"f12",144:"numlock",145:"scroll",191:"/",224:"meta"},shiftNums:{"`":"~","1":"!","2":"@","3":"#","4":"$","5":"%","6":"^","7":"&","8":"*","9":"(","0":")","-":"_","=":"+",";":": ","'":"\"",",":"<",".":">","/":"?","\\":"|"}};function keyHandler(handleObj){if(typeof handleObj.data!=="string"){return}var origHandler=handleObj.handler,keys=handleObj.data.toLowerCase().split(" ");handleObj.handler=function(event){if(this!==event.target&&(/textarea|select/i.test(event.target.nodeName)||event.target.type==="text")){return}var special=event.type!=="keypress"&&jQuery.hotkeys.specialKeys[event.which],character=String.fromCharCode(event.which).toLowerCase(),key,modif="",possible={};if(event.altKey&&special!=="alt"){modif+="alt+"}if(event.ctrlKey&&special!=="ctrl"){modif+="ctrl+"}if(event.metaKey&&!event.ctrlKey&&special!=="meta"){modif+="meta+"}if(event.shiftKey&&special!=="shift"){modif+="shift+"}if(special){possible[modif+special]=true}else{possible[modif+character]=true;possible[modif+jQuery.hotkeys.shiftNums[character]]=true;if(modif==="shift+"){possible[jQuery.hotkeys.shiftNums[character]]=true}}for(var i=0,l=keys.length;i<l;i++){if(possible[keys[i]]){return origHandler.apply(this,arguments)}}}}jQuery.each(["keydown","keyup","keypress"],function(){jQuery.event.special[this]={add:keyHandler}})})(jQuery);