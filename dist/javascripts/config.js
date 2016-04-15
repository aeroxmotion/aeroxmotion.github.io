
/**
*   ________________     ________________     ________________     ________________
*  |\      _____    \   |\    ___________\   |\      _____    \   |\               \
*  \ \     \___/\    \  \ \   \__________/   \ \     \___/\    \  \ \     ______    \
*   \ \     \__\_\    \  \ \   \____________  \ \     \__\_\   _\  \ \    \____/\    \
*    \ \               \  \ \    ___________\  \ \            /_/_  \ \    \   \ \    \
*     \ \     ______    \  \ \   \__________/   \ \     ______    \  \ \    \___\_\    \
*      \ \    \____/\    \  \ \   \____________  \ \    \____/\    \  \ \               \
*       \ \____\   \ \____\  \ \_______________\  \ \____\   \ \____\  \ \_______________\
*        \|____/    \|____/   \|_______________/   \|____/    \|____/   \|_______________/
*
*                                  M o t i o n      D e s i g n
*
*                                 Copyright (c) 2016 AeroXMotion
 */

(function() {
  'use strict';
  var $, preloader;

  $ = function(selector) {
    return document.querySelector(selector);
  };

  preloader = $('#preloader');

  window.addEventListener('load', function() {
    preloader.classList.add('is-hide');
  });

  preloader.addEventListener('transitionend', function(e) {
    if (e.propertyName === 'visibility') {
      $('body').removeChild(this);
    }
  });

}).call(this);
