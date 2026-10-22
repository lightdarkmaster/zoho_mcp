(() => {
  'use strict';

  /* ============================================================
     ZOHO SERVICE LOGOS: EDIT HERE
     Paste a logo URL or a local path between the quotes, e.g.
       'CRM': 'https://example.com/crm.svg',
       'Desk': 'logos/desk.png',      (file inside a logos/ folder)
     Leave '' to use the automatic guess; if that image also fails,
     a tile with the service's initials is shown instead.
     ============================================================ */
  const LOGO_URLS = {
    'CRM': 'https://www.logoshape.com/zoho-products-logo',
    'Workdrive': 'https://zapier.com/apps/zoho-workdrive/integrations',
    'Cliq': 'https://www.capterra.com/p/167639/Zoho-Cliq/',
    'Qntrl': '',
    'Projects': '',
    'Mail': '',
    'Bigin': '',
    'Desk': '',
    'Books': '',
    'Billing': '',
    'Inventory': '',
    'Invoice': '',
    'Expense': '',
    'Payroll': '',
    'Sdp On Demand': '',
    'Apptics': '',
    'Notebook': '',
    'Endpoint Central': '',
    'Dataprep': '',
    'MDM': '',
    'Calendar': '',
    'Creator': '',
    'Site24x7': '',
    'Sprints': '',
    'Commerce': '',
    'CloudSpend': '',
    'Learn': '',
    'Analytics': '',
    'Assist': '',
    'Lens': '',
    'Bookings': '',
    'Recruit': '',
    'Writer': '',
    'Verticals': '',
    'Payments': '',
    'Catalyst': '',
    'Social': '',
    'Log360 Cloud': '',
    'Survey': '',
    'People': '',
    'SalesIQ': '',
    'POS': '',
    'Sheet': '',
    'Site24x7 Tools': '',
    'Backstage': '',
    'Sign': '',
    'IOT': '',
    'One': '',
    'Directory': '',
    'Vani': '',
    'ERP': '',
    'Procurement': '',
    'Meeting': '',
    'Webinar': '',
    'Tables': '',
    'Connect': '',
    'Command Center': '',
    'Show': '',
    'PageSense': '',
    'Office Integrator': '',
    'Analytics Plus': '',
    'Quartz': '',
    'Sites': '',
    'Forms': '',
    'CommunitySpaces': '',
    'Solo': '',
    'Arattai Business': 'https://seeklogo.com/free-vector-logos/zoho',
    'Vertical Studio': '',
    'TrainerCentral': '',
    'Voice': '',
    'Campaigns': 'https://imgs.search.brave.com/MQeeC_2GKinvLQVsAijGQpGToPPPwCEEIqhS3Ci2oqg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9mbG93/LXB1YmxpYy5uaW1i/dXNwb3AuY29tL2Zs/b3ctYXBwcy96b2hv/X2NhbXBhaWducy5w/bmc',
  };

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Mobile menu */
  const toggle = $('.nav-toggle'), menu = $('#menu');
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
  $$('#menu a').forEach(a => a.addEventListener('click', () => {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));

  /* Hero: typed sample prompts */
  const demos = [
    ['Sales', 'Mark the Zylker deal as won and schedule a call with John for an onboarding meeting', 'Auto-update deals, trigger follow-ups, and log meetings.'],
    ['Marketing', 'Schedule a campaign called ‘Summer Sale Blast’ for next Tuesday at 11 AM and target all leads from Bangalore.', 'Generate campaign reports, launch workflows, and optimize content.'],
    ['Support', 'Search the desk for any open tickets. Mark them as in progress and send a reply that we are working on it.', 'Escalate tickets, summarize threads, and auto-assign queries.'],
    ['Finance', 'Generate an invoice for Naveen Kumar from ABC Corp for ₹1200 on consulting services', 'Generate invoices, track payments, log expenses, and create reports.']
  ];
  const typed = $('#typed'), label = $('#demoModule'), result = $('#demoResult');
  let di = 0;
  const show = i => { const d = demos[i]; label.textContent = d[0]; typed.textContent = d[1]; result.textContent = d[2]; };
  const type = () => {
    const [name, text, res] = demos[di];
    label.textContent = name; result.style.opacity = 0; typed.textContent = '';
    let n = 0;
    const tick = () => {
      typed.textContent = text.slice(0, ++n);
      if (n < text.length) return setTimeout(tick, 28);
      result.textContent = res; result.style.opacity = 1;
      setTimeout(() => { di = (di + 1) % demos.length; type(); }, 3200);
    };
    tick();
  };
  result.style.transition = 'opacity .4s';
  reduceMotion ? show(0) : type();

  /* Prompt tabs */
  const tabs = $$('.tabs [role=tab]');
  const select = tab => {
    tabs.forEach(t => {
      const on = t === tab;
      t.setAttribute('aria-selected', on);
      t.tabIndex = on ? 0 : -1;
      $('#' + t.getAttribute('aria-controls')).hidden = !on;
    });
    tab.focus();
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(t));
    t.addEventListener('keydown', e => {
      const k = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
      if (k) { e.preventDefault(); select(tabs[(i + k + tabs.length) % tabs.length]); }
    });
  });

  /* How it works stepper */
  const steps = [
    ['Agent prompt', 'The AI agent sends a user request.', 'Create a lead with an email as emma@zylker.com'],
    ['Context gathering', 'Agents fetch the relevant context.', JSON.stringify({
      Module: 'Leads',
      instructions: 'Create a new lead with email address emma@zylker.com. Please set the email as the primary contact method.'
    }, null, 2)],
    ['MCP tool execution', 'Agents call the right tool.', JSON.stringify({
      url: 'https://www.zohoapis.com/crm/v2/Leads',
      method: 'POST',
      body: { data: [{ Email: 'emma@zylker.com', Last_Name: '', First_Name: 'Emma' }] },
      instructions: 'Create a new lead in Zoho CRM with email address emma@zylker.com. Use the standard layout.'
    }, null, 2)],
    ['MCP tool response', 'The tool returns a success or failure response.', JSON.stringify({
      data: { status_code: 'Success', message: 'Lead Created Successfully', lead_id: '10000000000022' }
    }, null, 2)]
  ];
  const list = $('#steps'), code = $('#stepCode'), desc = $('#stepDesc');
  const pick = i => {
    $$('button', list).forEach((b, j) => b.setAttribute('aria-selected', j === i));
    desc.textContent = steps[i][1];
    code.textContent = steps[i][2];
    const pre = code.parentElement; pre.style.animation = 'none'; pre.offsetWidth; pre.style.animation = '';
  };
  steps.forEach((s, i) => {
    const li = document.createElement('li');
    li.innerHTML = `<button type="button"><b>${i + 1}</b><svg class="ic"><use href="#i-${['chat','layers','plug','check'][i]}"/></svg>${s[0]}</button>`;
    li.firstChild.addEventListener('click', () => pick(i));
    list.append(li);
  });
  pick(0);

  /* ===== v2: motion & UX ===== */
  document.documentElement.classList.add('js');

  /* Scroll progress + back-to-top */
  const bar = $('.progress'), topBtn = $('.to-top');
  let ticking = false;
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    topBtn.hidden = false;
    topBtn.classList.toggle('show', scrollY > 700);
    ticking = false;
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  topBtn.addEventListener('click', () => scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));

  /* Staggered scroll reveal */
  const groups = ['.section > h2', '.section > .sub', '.grid', '.flow', '.card.wide', '.tabs', '.tab-panels', '.marquee', '.chips.big', '.svc-head', '.svc-grid', '.note', '.stepper', 'details', '.final'];
  const revealEls = [];
  groups.forEach(sel => $$(sel).forEach(el => {
    const kids = el.classList.contains('grid') ? [...el.children] : [el];
    kids.forEach((k, i) => { k.classList.add('reveal'); k.style.setProperty('--d', `${i * 0.09}s`); revealEls.push(k); });
  }));
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => io.observe(el));

  /* Active nav link */
  const links = $$('#menu a[href^="#"]:not(.btn)');
  const spy = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) links.forEach(a => a.setAttribute('aria-current', a.getAttribute('href') === '#' + e.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  links.forEach(a => { const t = $(a.getAttribute('href')); if (t) spy.observe(t); });

  /* Card spotlight follows the cursor */
  $$('.card').forEach(c => c.addEventListener('pointermove', e => {
    const r = c.getBoundingClientRect();
    c.style.setProperty('--mx', `${e.clientX - r.left}px`);
    c.style.setProperty('--my', `${e.clientY - r.top}px`);
  }));

  /* 500+ counter */
  const counter = $('[data-count]');
  if (counter && !reduceMotion) {
    const end = +counter.dataset.count; counter.textContent = '0';
    new IntersectionObserver(([e], o) => {
      if (!e.isIntersecting) return; o.disconnect();
      const t0 = performance.now();
      const step = t => {
        const p = Math.min((t - t0) / 1400, 1);
        counter.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.6 }).observe(counter);
  }


  /* ===== v3: imagery ===== */
  const brands = { GitHub: 'github', GitLab: 'gitlab', Stripe: 'stripe', Twilio: 'twilio', Notion: 'notion', Mailchimp: 'mailchimp', Outlook: 'microsoftoutlook', OneDrive: 'microsoftonedrive', PagerDuty: 'pagerduty', Basecamp: 'basecamp', ActiveCampaign: 'activecampaign', 'Microsoft To-Do': 'microsofttodo' };
  const zoho = { 'Zoho CRM': 'users', 'Zoho Desk': 'headset', 'Zoho Books': 'receipt', 'Zoho Mail': 'mail', 'Zoho Cliq': 'chat', 'Zoho People': 'users', 'Zoho Expense': 'receipt', 'Zoho Creator': 'braces', 'Zoho Billing': 'receipt', 'Zoho Survey': 'check', Bigin: 'trend' };
  const monogram = (name, el) => {
    const h = [...name].reduce((a, ch) => (a * 31 + ch.charCodeAt(0)) % 360, 7);
    el.className = 'logo'; el.style.setProperty('--h', h);
    el.textContent = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  };
  $$('.chips.big span').forEach(c => {
    const name = c.textContent.trim(), tile = document.createElement('i');
    tile.setAttribute('aria-hidden', 'true');
    if (brands[name]) {
      tile.className = 'logo brand'; tile.dataset.name = name;
      tile.innerHTML = `<img src="https://cdn.simpleicons.org/${brands[name]}" alt="" width="18" height="18" loading="lazy" referrerpolicy="no-referrer">`;
    } else if (zoho[name]) {
      tile.className = 'logo app';
      tile.innerHTML = `<svg class="ic"><use href="#i-${zoho[name]}"/></svg>`;
    } else monogram(name, tile);
    c.prepend(tile);
  });
  /* Brand logo failed to load (offline, blocked, unknown slug): show initials instead */
  document.addEventListener('error', e => {
    const t = e.target;
    if (t.tagName === 'IMG' && t.parentElement && t.parentElement.dataset.name) {
      const tile = t.parentElement; monogram(tile.dataset.name, tile); tile.removeAttribute('data-name');
    }
  }, true);
  $$('img.av').forEach(img => {
    const fallback = () => {
      const s = document.createElement('span'); s.className = 'av';
      s.textContent = img.alt.replace('CA ', '').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
      img.replaceWith(s);
    };
    img.addEventListener('error', fallback);
    if (img.complete && !img.naturalWidth) fallback();
  });


  /* ===== v5: Zoho services grid (names from zoho.com/mcp/services/zoho-services.html) ===== */
  const services = ['CRM','Workdrive','Cliq','Qntrl','Projects','Mail','Bigin','Desk','Books','Billing','Inventory','Invoice','Expense','Payroll','Sdp On Demand','Apptics','Notebook','Endpoint Central','Dataprep','MDM','Calendar','Creator','Site24x7','Sprints','Commerce','CloudSpend','Learn','Analytics','Assist','Lens','Bookings','Recruit','Writer','Verticals','Payments','Catalyst','Social','Log360 Cloud','Survey','People','SalesIQ','POS','Sheet','Site24x7 Tools','Backstage','Sign','IOT','One','Directory','Vani','ERP','Procurement','Meeting','Webinar','Tables','Connect','Command Center','Show','PageSense','Office Integrator','Analytics Plus','Quartz','Sites','Forms','CommunitySpaces','Solo','Arattai Business','Vertical Studio','TrainerCentral'];
  const upcoming = ['Voice','Campaigns'];
  const grid = $('#svcGrid');
  const LOGO = 'https://www.zohowebstatic.com/sites/zweb/images/productlogos/';
  const tileFor = (n, soon) => {
    const full = 'Zoho ' + n, slug = n.toLowerCase().replace(/[^a-z0-9]/g, '');
    const a = document.createElement('div'); a.className = 'svc glass'; a.dataset.q = full.toLowerCase();
    a.innerHTML = `<i class="logo brand" data-name="${full}" aria-hidden="true"><img src="${LOGO_URLS[n] || LOGO + slug + '.svg'}" alt="" width="24" height="24" loading="lazy" referrerpolicy="no-referrer"></i><span>${full}</span>${soon ? '<em>Soon</em>' : ''}`;
    return a;
  };
  services.forEach(n => grid.append(tileFor(n)));
  upcoming.forEach(n => grid.append(tileFor(n, true)));
  $('#svcFilter').addEventListener('input', e => {
    const q = e.target.value.trim().toLowerCase(); let shown = 0;
    $$('.svc', grid).forEach(t => { const m = t.dataset.q.includes(q); t.hidden = !m; shown += m; });
    $('#svcEmpty').hidden = shown > 0;
  });

  /* Integrations: two-row marquee */
  const chips = $('.chips.big');
  if (chips && !reduceMotion) {
    const items = [...chips.children], half = Math.ceil(items.length / 2);
    const wrap = document.createElement('div'); wrap.className = 'marquee reveal';
    [items.slice(0, half), items.slice(half)].forEach(row => {
      const track = document.createElement('div'); track.className = 'track';
      [...row, ...row].forEach((n, i) => { const c = n.cloneNode(true); if (i >= row.length) c.setAttribute('aria-hidden', 'true'); track.append(c); });
      wrap.append(track);
    });
    chips.replaceWith(wrap); io.observe(wrap);
  }

  /* Stepper: auto-play with progress, stops on interaction */
  const DUR = 5000; let cur = 0, timer = null, userStopped = false, visible = false;
  const stepper = $('.stepper');
  list.style.setProperty('--dur', DUR / 1000 + 's');
  const play = () => {
    clearTimeout(timer);
    if (reduceMotion || userStopped || !visible) { list.classList.remove('playing'); return; }
    list.classList.remove('playing'); list.offsetWidth; list.classList.add('playing');
    timer = setTimeout(() => { cur = (cur + 1) % steps.length; pick(cur); play(); }, DUR);
  };
  $$('button', list).forEach((b, i) => b.addEventListener('click', () => { cur = i; userStopped = true; play(); }));
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; play(); }, { threshold: 0.4 }).observe(stepper);

  /* Copy payload */
  const copy = document.createElement('button');
  copy.className = 'copy'; copy.type = 'button'; copy.textContent = 'Copy';
  $('.code-card').append(copy);
  copy.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(code.textContent); copy.textContent = 'Copied'; }
    catch { copy.textContent = 'Press Ctrl+C'; }
    setTimeout(() => (copy.textContent = 'Copy'), 1600);
  });
  onScroll();
})();