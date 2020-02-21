const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('utm_source')) { setCookie('utm_source', urlParams.get('utm_source'), 30); }
if (urlParams.has('utm_medium')) { setCookie('utm_medium', urlParams.get('utm_medium'), 30); }
if (urlParams.has('utm_campaign')) { setCookie('utm_campaign', urlParams.get('utm_campaign'), 30); }
if (urlParams.has('utm_term')) { setCookie('utm_term', urlParams.get('utm_term'), 30); }
if (urlParams.has('utm_content')) { setCookie('utm_content', urlParams.get('utm_content'), 30); }
if (urlParams.has('utm_keyword')) { setCookie('utm_keyword', urlParams.get('utm_keyword'), 30); }
if (urlParams.has('utm_tags')) { setCookie('utm_tags', urlParams.get('utm_tags'), 30); }
var TipId = 1;



