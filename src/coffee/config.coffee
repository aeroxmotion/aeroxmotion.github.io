###*
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
###

# Enable strict mode
'use strict'

# Simple selector
$ = (selector) ->
  document.querySelector selector

# Preloader
preloader = $ '#preloader'

window.addEventListener 'load', ->
  preloader.classList.add 'is-hide'
  return

preloader.addEventListener 'transitionend', ->
  document.body.removeChild this
  return