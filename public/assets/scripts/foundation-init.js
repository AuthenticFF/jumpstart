import $ from 'jquery';

import { Foundation } from '../../../node_modules/foundation-sites/js/foundation.core';
Foundation.addToJquery($);

// Add Foundation Utils to Foundation global namespace for backwards
// compatibility.

import { rtl, GetYoDigits, transitionend } from '../../../node_modules/foundation-sites/js/foundation.util.core';
Foundation.rtl = rtl;
Foundation.GetYoDigits = GetYoDigits;
Foundation.transitionend = transitionend;

import { Box } from '../../../node_modules/foundation-sites/js/foundation.util.box'
import { onImagesLoaded } from '../../../node_modules/foundation-sites/js/foundation.util.imageLoader';
import { Keyboard } from '../../../node_modules/foundation-sites/js/foundation.util.keyboard';
import { MediaQuery } from '../../../node_modules/foundation-sites/js/foundation.util.mediaQuery';
import { Motion, Move } from '../../../node_modules/foundation-sites/js/foundation.util.motion';
import { Nest } from '../../../node_modules/foundation-sites/js/foundation.util.nest';
import { Timer } from '../../../node_modules/foundation-sites/js/foundation.util.timer';

Foundation.Box = Box;
Foundation.onImagesLoaded = onImagesLoaded;
Foundation.Keyboard = Keyboard;
Foundation.MediaQuery = MediaQuery;
Foundation.Motion = Motion;
Foundation.Move = Move;
Foundation.Nest = Nest;
Foundation.Timer = Timer;

// Touch and Triggers previously were almost purely sede effect driven,
// so no // need to add it to Foundation, just init them.

import { Touch } from '../../../node_modules/foundation-sites/js/foundation.util.touch';
Touch.init($);

import { Triggers } from '../../../node_modules/foundation-sites/js/foundation.util.triggers';
Triggers.init($, Foundation);

// import { Abide } from '../../../node_modules/foundation-sites/js/foundation.abide';
// Foundation.plugin(Abide, 'Abide');
//
// import { Accordion } from '../../../node_modules/foundation-sites/js/foundation.accordion';
// Foundation.plugin(Accordion, 'Accordion');
//
// import { AccordionMenu } from '../../../node_modules/foundation-sites/js/foundation.accordionMenu';
// Foundation.plugin(AccordionMenu, 'AccordionMenu');
//
// import { Drilldown } from '../../../node_modules/foundation-sites/js/foundation.drilldown';
// Foundation.plugin(Drilldown, 'Drilldown');
//
// import { Dropdown } from '../../../node_modules/foundation-sites/js/foundation.dropdown';
// Foundation.plugin(Dropdown, 'Dropdown');
//
// import { DropdownMenu } from '../../../node_modules/foundation-sites/js/foundation.dropdownMenu';
// Foundation.plugin(DropdownMenu, 'DropdownMenu');
//
import { Equalizer } from '../../../node_modules/foundation-sites/js/foundation.equalizer';
Foundation.plugin(Equalizer, 'Equalizer');
//
// import { Interchange } from '../../../node_modules/foundation-sites/js/foundation.interchange';
// Foundation.plugin(Interchange, 'Interchange');
//
// import { Magellan } from '../../../node_modules/foundation-sites/js/foundation.magellan';
// Foundation.plugin(Magellan, 'Magellan');
//
// import { OffCanvas } from '../../../node_modules/foundation-sites/js/foundation.offcanvas';
// Foundation.plugin(OffCanvas, 'OffCanvas');
//
// import { Orbit } from '../../../node_modules/foundation-sites/js/foundation.orbit';
// Foundation.plugin(Orbit, 'Orbit');
//
// import { ResponsiveMenu } from '../../../node_modules/foundation-sites/js/foundation.responsiveMenu';
// Foundation.plugin(ResponsiveMenu, 'ResponsiveMenu');
//
// import { ResponsiveToggle } from '../../../node_modules/foundation-sites/js/foundation.responsiveToggle';
// Foundation.plugin(ResponsiveToggle, 'ResponsiveToggle');
//
// import { Reveal } from '../../../node_modules/foundation-sites/js/foundation.reveal';
// Foundation.plugin(Reveal, 'Reveal');
//
// import { Slider } from '../../../node_modules/foundation-sites/js/foundation.slider';
// Foundation.plugin(Slider, 'Slider');
//
// import { SmoothScroll } from '../../../node_modules/foundation-sites/js/foundation.smoothScroll';
// Foundation.plugin(SmoothScroll, 'SmoothScroll');
//
// import { Sticky } from '../../../node_modules/foundation-sites/js/foundation.sticky';
// Foundation.plugin(Sticky, 'Sticky');
//
// import { Tabs } from '../../../node_modules/foundation-sites/js/foundation.tabs';
// Foundation.plugin(Tabs, 'Tabs');
//
// import { Toggler } from '../../../node_modules/foundation-sites/js/foundation.toggler';
// Foundation.plugin(Toggler, 'Toggler');
//
// import { Tooltip } from '../../../node_modules/foundation-sites/js/foundation.tooltip';
// Foundation.plugin(Tooltip, 'Tooltip');
//
// import { ResponsiveAccordionTabs } from '../../../node_modules/foundation-sites/js/foundation.responsiveAccordionTabs';
// Foundation.plugin(ResponsiveAccordionTabs, 'ResponsiveAccordionTabs');
