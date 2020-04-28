![ZoomCongnito icon banner](https://raw.githubusercontent.com/s-weigand/zoomcognito/master/assets/icon-banner.svg)

[![codecov](https://codecov.io/gh/s-weigand/zoomcognito/branch/master/graph/badge.svg)](https://codecov.io/gh/s-weigand/zoomcognito)

# ZoomCongnito

This browser extension is an effort to make using zoom in the browser more comfortable and also help users to guard their privacy better (incognito/private window).

![ZoomCongnito icon makeup banner](https://raw.githubusercontent.com/s-weigand/zoomcognito/master/assets/combi-banner.svg)

## Background

Due to the covid19 pandemic in 2020 many companies and universities were in dire need of a solution for online meetings/lectures.
Which is why many quickly adapted [Zoom](https://zoom.us/) as their solution of choice, sadly the [zoom client had/has reportedly security flaws](https://www.securityweek.com/zoom-vulnerabilities-expose-users-spying-other-attacks) and was even [sued for allegedly handing over user data](https://www.businessinsider.com/zoom-sued-allegedly-sharing-data-with-facebook-2020-3?r=DE&IR=T).

Since this is all very concerning, but users are left with pretty much no choice, but to use it anyway, this extension comes into play, as an attempt to at least minimize the data which is shared with zoom.

## Features

### Implemented

- Context menu entry to open zoom link in a private browser window
- Zoom meeting url prefixing, with company/university subdomain
- Blocking of the automatic zoom client download (deactivatable)(can't test this right now, since tu-berlin doesn't use it anymore)
- Auto filling of the user name (**Needs rights to run in private window, to work in private windows**)
- Auto confirming of zoom user agreement (**Needs rights to run in private window, to work in private windows**)

### Planned

- Import/export settings
- Bookmarking integration
- Per meeting bookmark settings (i.e. url prefixing)
- Zoom meeting link extraction

## Configuration

For FireFox rights to run in private window, are mandatory to open a private window.

## Changelog

To see the changes between versions have a look at the [changelog](https://github.com/s-weigand/zoomcognito/blob/master/CHANGELOG.md)

## Credits

This extension is inspired by [zoom-redirector](https://github.com/arkadiyt/zoom-redirector) licensed under the [MIT licence](https://github.com/arkadiyt/zoom-redirector/blob/master/LICENSE.md).

As can be seen above the logo was derived as a combination of two existing images.

Namely:

- [zoom-icon.svg](https://github.com/s-weigand/zoomcognito/blob/master/assets/zoom-icon.svg) created by [Papirus Development Team](https://github.com/PapirusDevelopmentTeam) and licensed under the [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.en.html)
- [Incognito.svg](https://github.com/s-weigand/zoomcognito/blob/master/assets/Incognito.svg) created by [Roundicons.com](https://www.roundicons.com) and licensed under [CC Attribution 4.0](https://creativecommons.org/licenses/by/4.0/)
