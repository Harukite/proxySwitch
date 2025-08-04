(function(define){var __define; typeof define === "function" && (__define=define,define=null);
// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"gOBYX":[function(require,module,exports) {
var u = globalThis.process?.argv || [];
var h = ()=>globalThis.process?.env || {};
var B = new Set(u), _ = (e)=>B.has(e), G = u.filter((e)=>e.startsWith("--") && e.includes("=")).map((e)=>e.split("=")).reduce((e, [t, o])=>(e[t] = o, e), {});
var U = _("--dry-run"), g = ()=>_("--verbose") || h().VERBOSE === "true", N = g();
var m = (e = "", ...t)=>console.log(e.padEnd(9), "|", ...t);
var y = (...e)=>console.error("\uD83D\uDD34 ERROR".padEnd(9), "|", ...e), v = (...e)=>m("\uD83D\uDD35 INFO", ...e), f = (...e)=>m("\uD83D\uDFE0 WARN", ...e), M = 0, i = (...e)=>g() && m(`\u{1F7E1} ${M++}`, ...e);
var b = ()=>{
    let e = globalThis.browser?.runtime || globalThis.chrome?.runtime, t = ()=>setInterval(e.getPlatformInfo, 24e3);
    e.onStartup.addListener(t), t();
};
var n = {
    "isContentScript": false,
    "isBackground": true,
    "isReact": false,
    "runtimes": [
        "background-service-runtime"
    ],
    "host": "localhost",
    "port": 1815,
    "entryFilePath": "/Users/iot02/aiWork/proxy-switch/.plasmo/static/background/index.ts",
    "bundleId": "c338908e704c91f1",
    "envHash": "d99a5ffa57acd638",
    "verbose": "false",
    "secure": false,
    "serverPort": 58699
};
module.bundle.HMR_BUNDLE_ID = n.bundleId;
globalThis.process = {
    argv: [],
    env: {
        VERBOSE: n.verbose
    }
};
var D = module.bundle.Module;
function H(e) {
    D.call(this, e), this.hot = {
        data: module.bundle.hotData[e],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(t) {
            this._acceptCallbacks.push(t || function() {});
        },
        dispose: function(t) {
            this._disposeCallbacks.push(t);
        }
    }, module.bundle.hotData[e] = void 0;
}
module.bundle.Module = H;
module.bundle.hotData = {};
var c = globalThis.browser || globalThis.chrome || null;
function R() {
    return !n.host || n.host === "0.0.0.0" ? location.protocol.indexOf("http") === 0 ? location.hostname : "localhost" : n.host;
}
function x() {
    return !n.host || n.host === "0.0.0.0" ? "localhost" : n.host;
}
function d() {
    return n.port || location.port;
}
var P = "__plasmo_runtime_page_", S = "__plasmo_runtime_script_";
var O = `${n.secure ? "https" : "http"}://${R()}:${d()}/`;
async function k(e = 1470) {
    for(;;)try {
        await fetch(O);
        break;
    } catch  {
        await new Promise((o)=>setTimeout(o, e));
    }
}
if (c.runtime.getManifest().manifest_version === 3) {
    let e = c.runtime.getURL("/__plasmo_hmr_proxy__?url=");
    globalThis.addEventListener("fetch", function(t) {
        let o = t.request.url;
        if (o.startsWith(e)) {
            let s = new URL(decodeURIComponent(o.slice(e.length)));
            s.hostname === n.host && s.port === `${n.port}` ? (s.searchParams.set("t", Date.now().toString()), t.respondWith(fetch(s).then((r)=>new Response(r.body, {
                    headers: {
                        "Content-Type": r.headers.get("Content-Type") ?? "text/javascript"
                    }
                })))) : t.respondWith(new Response("Plasmo HMR", {
                status: 200,
                statusText: "Testing"
            }));
        }
    });
}
function E(e, t) {
    let { modules: o } = e;
    return o ? !!o[t] : !1;
}
function C(e = d()) {
    let t = x();
    return `${n.secure || location.protocol === "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(t) ? "wss" : "ws"}://${t}:${e}/`;
}
function L(e) {
    typeof e.message == "string" && y("[plasmo/parcel-runtime]: " + e.message);
}
function T(e) {
    if (typeof globalThis.WebSocket > "u") return;
    let t = new WebSocket(C(Number(d()) + 1));
    return t.addEventListener("message", async function(o) {
        let s = JSON.parse(o.data);
        await e(s);
    }), t.addEventListener("error", L), t;
}
function A(e) {
    if (typeof globalThis.WebSocket > "u") return;
    let t = new WebSocket(C());
    return t.addEventListener("message", async function(o) {
        let s = JSON.parse(o.data);
        if (s.type === "update" && await e(s.assets), s.type === "error") for (let r of s.diagnostics.ansi){
            let l = r.codeframe || r.stack;
            f("[plasmo/parcel-runtime]: " + r.message + `
` + l + `

` + r.hints.join(`
`));
        }
    }), t.addEventListener("error", L), t.addEventListener("open", ()=>{
        v(`[plasmo/parcel-runtime]: Connected to HMR server for ${n.entryFilePath}`);
    }), t.addEventListener("close", ()=>{
        f(`[plasmo/parcel-runtime]: Connection to the HMR server is closed for ${n.entryFilePath}`);
    }), t;
}
var w = module.bundle.parent, a = {
    buildReady: !1,
    bgChanged: !1,
    csChanged: !1,
    pageChanged: !1,
    scriptPorts: new Set,
    pagePorts: new Set
};
async function p(e = !1) {
    if (e || a.buildReady && a.pageChanged) {
        i("BGSW Runtime - reloading Page");
        for (let t of a.pagePorts)t.postMessage(null);
    }
    if (e || a.buildReady && (a.bgChanged || a.csChanged)) {
        i("BGSW Runtime - reloading CS");
        let t = await c?.tabs.query({
            active: !0
        });
        for (let o of a.scriptPorts){
            let s = t.some((r)=>r.id === o.sender.tab?.id);
            o.postMessage({
                __plasmo_cs_active_tab__: s
            });
        }
        c.runtime.reload();
    }
}
if (!w || !w.isParcelRequire) {
    b();
    let e = A(async (t)=>{
        i("BGSW Runtime - On HMR Update"), a.bgChanged ||= t.filter((s)=>s.envHash === n.envHash).some((s)=>E(module.bundle, s.id));
        let o = t.find((s)=>s.type === "json");
        if (o) {
            let s = new Set(t.map((l)=>l.id)), r = Object.values(o.depsByBundle).map((l)=>Object.values(l)).flat();
            a.bgChanged ||= r.every((l)=>s.has(l));
        }
        p();
    });
    e.addEventListener("open", ()=>{
        let t = setInterval(()=>e.send("ping"), 24e3);
        e.addEventListener("close", ()=>clearInterval(t));
    }), e.addEventListener("close", async ()=>{
        await k(), p(!0);
    });
}
T(async (e)=>{
    switch(i("BGSW Runtime - On Build Repackaged"), e.type){
        case "build_ready":
            a.buildReady ||= !0, p();
            break;
        case "cs_changed":
            a.csChanged ||= !0, p();
            break;
    }
});
c.runtime.onConnect.addListener(function(e) {
    let t = e.name.startsWith(P), o = e.name.startsWith(S);
    if (t || o) {
        let s = t ? a.pagePorts : a.scriptPorts;
        s.add(e), e.onDisconnect.addListener(()=>{
            s.delete(e);
        }), e.onMessage.addListener(function(r) {
            i("BGSW Runtime - On source changed", r), r.__plasmo_cs_changed__ && (a.csChanged ||= !0), r.__plasmo_page_changed__ && (a.pageChanged ||= !0), p();
        });
    }
});
c.runtime.onMessage.addListener(function(t) {
    return t.__plasmo_full_reload__ && (i("BGSW Runtime - On top-level code changed"), p()), !0;
});

},{}],"8oeFb":[function(require,module,exports) {
var _background = require("../../../background");

},{"../../../background":"14rpM"}],"14rpM":[function(require,module,exports) {
var _storage = require("~utils/storage");
var _proxy = require("~utils/proxy");
// \u5f53\u524d\u8ba4\u8bc1\u4fe1\u606f
let currentAuth = null;
// \u6269\u5c55\u5b89\u88c5\u65f6\u7684\u521d\u59cb\u5316
chrome.runtime.onInstalled.addListener(()=>{
    console.log("Modern Proxy Switch installed");
    // \u786e\u4fdd\u4ee3\u7406\u88ab\u5173\u95ed
    (0, _proxy.disableProxy)().catch(console.error);
    (0, _proxy.clearBadge)();
});
// \u6d4f\u89c8\u5668\u542f\u52a8\u65f6\u6062\u590d\u4ee3\u7406\u72b6\u6001
chrome.runtime.onStartup.addListener(async ()=>{
    try {
        const activeProxyId = await (0, _storage.getActiveProxy)();
        if (activeProxyId) {
            const proxies = await (0, _storage.getProxies)();
            const activeProxy = proxies.find((p)=>p.id === activeProxyId);
            if (activeProxy) {
                await (0, _proxy.applyProxy)(activeProxy);
                (0, _proxy.setBadge)(activeProxy.name.charAt(0).toUpperCase());
            } else {
                await (0, _storage.saveActiveProxy)(null);
                (0, _proxy.clearBadge)();
            }
        }
    } catch (error) {
        console.error("Failed to restore proxy on startup:", error);
    }
});
// \u76d1\u542c\u6765\u81eapopup\u7684\u6d88\u606f
chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
    handleMessage(message).then(sendResponse).catch((error)=>{
        sendResponse({
            success: false,
            error: error.message
        });
    });
    return true // \u4fdd\u6301\u6d88\u606f\u901a\u9053\u5f00\u653e
    ;
});
// \u5904\u7406\u6d88\u606f
async function handleMessage(message) {
    switch(message.type){
        case "GET_PROXIES":
            const proxies = await (0, _storage.getProxies)();
            const activeProxyId = await (0, _storage.getActiveProxy)();
            const proxiesWithStatus = proxies.map((proxy)=>({
                    ...proxy,
                    isActive: proxy.id === activeProxyId
                }));
            return {
                success: true,
                data: proxiesWithStatus
            };
        case "ADD_PROXY":
            return await addProxy(message.data);
        case "UPDATE_PROXY":
            return await updateProxy(message.data);
        case "DELETE_PROXY":
            return await deleteProxy(message.data.id);
        case "ACTIVATE_PROXY":
            return await activateProxy(message.data.id);
        case "DISCONNECT_PROXY":
            return await disconnectProxy();
        case "GET_STATUS":
            return await getProxyStatus();
        case "IMPORT_PROXIES":
            return await importProxies(message.data);
        case "EXPORT_PROXIES":
            return await exportProxies();
        default:
            return {
                success: false,
                error: "Unknown message type"
            };
    }
}
// \u6dfb\u52a0\u4ee3\u7406
async function addProxy(proxyData) {
    try {
        const newProxy = await (0, _storage.addProxy)(proxyData);
        return {
            success: true,
            data: newProxy
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
}
// \u66f4\u65b0\u4ee3\u7406
async function updateProxy(proxyData) {
    try {
        await (0, _storage.updateProxy)(proxyData);
        return {
            success: true
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
}
// \u5220\u9664\u4ee3\u7406
async function deleteProxy(proxyId) {
    try {
        // \u5982\u679c\u8981\u5220\u9664\u7684\u4ee3\u7406\u6b63\u5728\u4f7f\u7528\uff0c\u5148\u65ad\u5f00\u8fde\u63a5
        const activeProxyId = await (0, _storage.getActiveProxy)();
        if (activeProxyId === proxyId) await disconnectProxy();
        await (0, _storage.deleteProxy)(proxyId);
        return {
            success: true
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
}
// \u6fc0\u6d3b\u4ee3\u7406
async function activateProxy(proxyId) {
    try {
        const proxies = await (0, _storage.getProxies)();
        const proxy = proxies.find((p)=>p.id === proxyId);
        if (!proxy) return {
            success: false,
            error: "\u4ee3\u7406\u4e0d\u5b58\u5728"
        };
        // \u8bbe\u7f6e\u8ba4\u8bc1\u4fe1\u606f
        if (proxy.username && proxy.password) {
            currentAuth = {
                username: proxy.username,
                password: proxy.password
            };
            setupAuthListener();
        } else {
            currentAuth = null;
            removeAuthListener();
        }
        await (0, _proxy.applyProxy)(proxy);
        await (0, _storage.saveActiveProxy)(proxyId);
        (0, _proxy.setBadge)(proxy.name.charAt(0).toUpperCase());
        return {
            success: true,
            data: proxy
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
}
// \u65ad\u5f00\u4ee3\u7406
async function disconnectProxy() {
    try {
        await (0, _proxy.disableProxy)();
        await (0, _storage.saveActiveProxy)(null);
        currentAuth = null;
        removeAuthListener();
        (0, _proxy.clearBadge)();
        return {
            success: true
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
}
// \u83b7\u53d6\u4ee3\u7406\u72b6\u6001
async function getProxyStatus() {
    try {
        const activeProxyId = await (0, _storage.getActiveProxy)();
        let activeProxy = null;
        if (activeProxyId) {
            const proxies = await (0, _storage.getProxies)();
            activeProxy = proxies.find((p)=>p.id === activeProxyId) || null;
        }
        return {
            success: true,
            data: {
                isEnabled: !!activeProxy,
                currentProxy: activeProxy,
                connectionStatus: activeProxy ? "connected" : "disconnected"
            }
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
}
// \u5bfc\u5165\u4ee3\u7406
async function importProxies(newProxies) {
    try {
        const existingProxies = await (0, _storage.getProxies)();
        const allProxies = [
            ...existingProxies,
            ...newProxies
        ];
        await (0, _storage.saveProxies)(allProxies);
        return {
            success: true,
            data: allProxies
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
}
// \u5bfc\u51fa\u4ee3\u7406
async function exportProxies() {
    try {
        const proxies = await (0, _storage.getProxies)();
        return {
            success: true,
            data: proxies
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
}
// \u8bbe\u7f6e\u8ba4\u8bc1\u76d1\u542c\u5668
function setupAuthListener() {
    if (chrome.webRequest && chrome.webRequest.onAuthRequired) {
        chrome.webRequest.onAuthRequired.removeListener(handleAuthRequest);
        chrome.webRequest.onAuthRequired.addListener(handleAuthRequest, {
            urls: [
                "<all_urls>"
            ]
        }, [
            "asyncBlocking"
        ]);
    }
}
// \u79fb\u9664\u8ba4\u8bc1\u76d1\u542c\u5668
function removeAuthListener() {
    if (chrome.webRequest && chrome.webRequest.onAuthRequired) chrome.webRequest.onAuthRequired.removeListener(handleAuthRequest);
}
// \u5904\u7406\u8ba4\u8bc1\u8bf7\u6c42
function handleAuthRequest(details) {
    if (currentAuth && details.isProxy) return {
        username: currentAuth.username,
        password: currentAuth.password
    };
    return undefined;
}

},{"~utils/storage":"6E8Wy","~utils/proxy":"gVeMk"}],"6E8Wy":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "STORAGE_KEYS", ()=>STORAGE_KEYS);
parcelHelpers.export(exports, "getProxies", ()=>getProxies);
parcelHelpers.export(exports, "saveProxies", ()=>saveProxies);
parcelHelpers.export(exports, "getSettings", ()=>getSettings);
parcelHelpers.export(exports, "saveSettings", ()=>saveSettings);
parcelHelpers.export(exports, "getActiveProxy", ()=>getActiveProxy);
parcelHelpers.export(exports, "saveActiveProxy", ()=>saveActiveProxy);
parcelHelpers.export(exports, "generateId", ()=>generateId);
parcelHelpers.export(exports, "addProxy", ()=>addProxy);
parcelHelpers.export(exports, "updateProxy", ()=>updateProxy);
parcelHelpers.export(exports, "deleteProxy", ()=>deleteProxy);
parcelHelpers.export(exports, "validateProxyConfig", ()=>validateProxyConfig);
var _location = require("./location");
const STORAGE_KEYS = {
    PROXIES: "proxies",
    SETTINGS: "settings",
    ACTIVE_PROXY: "activeProxy",
    PROXY_STATUS: "proxyStatus"
};
const getProxies = async ()=>{
    const result = await chrome.storage.sync.get(STORAGE_KEYS.PROXIES);
    return result[STORAGE_KEYS.PROXIES] || [];
};
const saveProxies = async (proxies)=>{
    await chrome.storage.sync.set({
        [STORAGE_KEYS.PROXIES]: proxies
    });
};
const getSettings = async ()=>{
    const result = await chrome.storage.sync.get(STORAGE_KEYS.SETTINGS);
    const defaultSettings = {
        autoConnect: false,
        showNotifications: true,
        theme: "auto"
    };
    return {
        ...defaultSettings,
        ...result[STORAGE_KEYS.SETTINGS]
    };
};
const saveSettings = async (settings)=>{
    await chrome.storage.sync.set({
        [STORAGE_KEYS.SETTINGS]: settings
    });
};
const getActiveProxy = async ()=>{
    const result = await chrome.storage.local.get(STORAGE_KEYS.ACTIVE_PROXY);
    return result[STORAGE_KEYS.ACTIVE_PROXY] || null;
};
const saveActiveProxy = async (proxyId)=>{
    if (proxyId) await chrome.storage.local.set({
        [STORAGE_KEYS.ACTIVE_PROXY]: proxyId
    });
    else await chrome.storage.local.remove(STORAGE_KEYS.ACTIVE_PROXY);
};
const generateId = ()=>{
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
const addProxy = async (proxy)=>{
    const proxies = await getProxies();
    const newProxy = {
        ...proxy,
        id: generateId()
    };
    // \u5148\u4fdd\u5b58\u57fa\u672c\u4fe1\u606f
    proxies.push(newProxy);
    await saveProxies(proxies);
    // \u5f02\u6b65\u68c0\u6d4b\u5f52\u5c5e\u5730\uff08\u4e0d\u963b\u585e\u4fdd\u5b58\u64cd\u4f5c\uff09
    if (!newProxy.location && newProxy.host) (0, _location.detectLocationOnline)(newProxy.host).then(async (locationInfo)=>{
        // \u66f4\u65b0\u4ee3\u7406\u7684\u5f52\u5c5e\u5730\u4fe1\u606f
        const updatedProxies = await getProxies();
        const index = updatedProxies.findIndex((p)=>p.id === newProxy.id);
        if (index !== -1) {
            updatedProxies[index].location = locationInfo.location;
            updatedProxies[index].countryCode = locationInfo.countryCode;
            await saveProxies(updatedProxies);
            // \u53d1\u9001\u6d88\u606f\u901a\u77e5background\u548cpopup\u66f4\u65b0
            try {
                chrome.runtime.sendMessage({
                    type: "PROXY_LOCATION_UPDATED",
                    data: {
                        proxyId: newProxy.id,
                        host: newProxy.host,
                        location: locationInfo.location,
                        countryCode: locationInfo.countryCode
                    }
                });
            } catch (error) {
            // \u5ffd\u7565\u6d88\u606f\u53d1\u9001\u9519\u8bef\uff08\u53ef\u80fd\u6ca1\u6709\u6d3b\u8dc3\u7684\u63a5\u6536\u8005\uff09
            }
        }
    }).catch(console.error);
    return newProxy;
};
const updateProxy = async (updatedProxy)=>{
    const proxies = await getProxies();
    const index = proxies.findIndex((p)=>p.id === updatedProxy.id);
    if (index !== -1) {
        const oldHost = proxies[index].host;
        // \u5148\u66f4\u65b0\u57fa\u672c\u4fe1\u606f
        proxies[index] = updatedProxy;
        await saveProxies(proxies);
        // \u5982\u679c\u4e3b\u673a\u5730\u5740\u6539\u53d8\u4e14\u6ca1\u6709\u5f52\u5c5e\u5730\u4fe1\u606f\uff0c\u5f02\u6b65\u68c0\u6d4b
        if (oldHost !== updatedProxy.host && !updatedProxy.location) (0, _location.detectLocationOnline)(updatedProxy.host).then(async (locationInfo)=>{
            const currentProxies = await getProxies();
            const currentIndex = currentProxies.findIndex((p)=>p.id === updatedProxy.id);
            if (currentIndex !== -1) {
                currentProxies[currentIndex].location = locationInfo.location;
                currentProxies[currentIndex].countryCode = locationInfo.countryCode;
                await saveProxies(currentProxies);
                // \u53d1\u9001\u6d88\u606f\u901a\u77e5\u66f4\u65b0
                try {
                    chrome.runtime.sendMessage({
                        type: "PROXY_LOCATION_UPDATED",
                        data: {
                            proxyId: updatedProxy.id,
                            host: updatedProxy.host,
                            location: locationInfo.location,
                            countryCode: locationInfo.countryCode
                        }
                    });
                } catch (error) {
                // \u5ffd\u7565\u6d88\u606f\u53d1\u9001\u9519\u8bef
                }
            }
        }).catch(console.error);
    }
};
const deleteProxy = async (proxyId)=>{
    const proxies = await getProxies();
    const filteredProxies = proxies.filter((p)=>p.id !== proxyId);
    await saveProxies(filteredProxies);
};
const validateProxyConfig = (config)=>{
    const errors = [];
    if (!config.name?.trim()) errors.push("\u4ee3\u7406\u540d\u79f0\u4e0d\u80fd\u4e3a\u7a7a");
    if (!config.host?.trim()) errors.push("\u670d\u52a1\u5668\u5730\u5740\u4e0d\u80fd\u4e3a\u7a7a");
    if (!config.port || config.port < 1 || config.port > 65535) errors.push("\u7aef\u53e3\u53f7\u5fc5\u987b\u57281-65535\u4e4b\u95f4");
    if (!config.type || ![
        "http",
        "https",
        "socks4",
        "socks5"
    ].includes(config.type)) errors.push("\u4ee3\u7406\u7c7b\u578b\u65e0\u6548");
    return errors;
};

},{"./location":"kwxV0","@parcel/transformer-js/src/esmodule-helpers.js":"iIXqM"}],"kwxV0":[function(require,module,exports) {
// IP\u5730\u5740\u5f52\u5c5e\u5730\u68c0\u6d4b\u5de5\u5177 - \u4f7f\u7528\u5728\u7ebfAPI
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// \u6dfb\u52a0\u4f4d\u7f6e\u66f4\u65b0\u76d1\u542c\u5668
parcelHelpers.export(exports, "addLocationUpdateListener", ()=>addLocationUpdateListener);
/**
 * \u4f7f\u7528\u514d\u8d39API\u68c0\u6d4bIP\u5730\u5740\u5f52\u5c5e\u5730
 * @param host IP\u5730\u5740\u6216\u57df\u540d
 * @returns \u5f52\u5c5e\u5730\u4fe1\u606fPromise
 */ parcelHelpers.export(exports, "detectLocationOnline", ()=>detectLocationOnline);
/**
 * \u517c\u5bb9\u65e7\u7248\u672c\u7684\u540c\u6b65\u68c0\u6d4b\u51fd\u6570\uff08\u4f18\u5148\u4f7f\u7528\u7f13\u5b58\uff0c\u4e0d\u5b58\u5728\u5219\u8fd4\u56de\u9ed8\u8ba4\u503c\u5e76\u89e6\u53d1\u5f02\u6b65\u67e5\u8be2\uff09
 * @param host IP\u5730\u5740\u6216\u57df\u540d
 * @returns \u5f52\u5c5e\u5730\u4fe1\u606f
 */ parcelHelpers.export(exports, "detectLocation", ()=>detectLocation);
/**
 * \u83b7\u53d6\u5f52\u5c5e\u5730\u663e\u793a\u6587\u672c
 * @param host IP\u5730\u5740\u6216\u57df\u540d
 * @returns \u5e26\u56fd\u65d7\u7684\u5f52\u5c5e\u5730\u6587\u672c
 */ parcelHelpers.export(exports, "getLocationDisplay", ()=>getLocationDisplay);
/**
 * \u83b7\u53d6\u7b80\u77ed\u7684\u5f52\u5c5e\u5730\u663e\u793a
 * @param host IP\u5730\u5740\u6216\u57df\u540d
 * @returns \u7b80\u77ed\u7684\u5f52\u5c5e\u5730\u6587\u672c
 */ parcelHelpers.export(exports, "getLocationShort", ()=>getLocationShort);
/**
 * \u6e05\u9664\u7f13\u5b58
 */ parcelHelpers.export(exports, "clearLocationCache", ()=>clearLocationCache);
/**
 * \u9884\u52a0\u8f7d\u5e38\u7528IP\u7684\u5f52\u5c5e\u5730\u4fe1\u606f
 * @param hosts IP\u5730\u5740\u6570\u7ec4
 */ parcelHelpers.export(exports, "preloadLocations", ()=>preloadLocations);
// \u76d1\u542c\u5668\u7ba1\u7406
const locationUpdateListeners = new Set();
function addLocationUpdateListener(listener) {
    locationUpdateListeners.add(listener);
    // \u8fd4\u56de\u79fb\u9664\u76d1\u542c\u5668\u7684\u51fd\u6570
    return ()=>locationUpdateListeners.delete(listener);
}
// \u89e6\u53d1\u4f4d\u7f6e\u66f4\u65b0\u4e8b\u4ef6
function notifyLocationUpdate(host, locationInfo) {
    locationUpdateListeners.forEach((listener)=>{
        try {
            listener(host, locationInfo);
        } catch (error) {
            console.error("Location update listener error:", error);
        }
    });
}
// \u56fd\u5bb6\u4ee3\u7801\u5230\u56fd\u65d7\u7684\u6620\u5c04
const countryFlags = {
    "CN": "\uD83C\uDDE8\uD83C\uDDF3",
    "US": "\uD83C\uDDFA\uD83C\uDDF8",
    "JP": "\uD83C\uDDEF\uD83C\uDDF5",
    "KR": "\uD83C\uDDF0\uD83C\uDDF7",
    "SG": "\uD83C\uDDF8\uD83C\uDDEC",
    "HK": "\uD83C\uDDED\uD83C\uDDF0",
    "TW": "\uD83C\uDDF9\uD83C\uDDFC",
    "GB": "\uD83C\uDDEC\uD83C\uDDE7",
    "UK": "\uD83C\uDDEC\uD83C\uDDE7",
    "DE": "\uD83C\uDDE9\uD83C\uDDEA",
    "FR": "\uD83C\uDDEB\uD83C\uDDF7",
    "NL": "\uD83C\uDDF3\uD83C\uDDF1",
    "RU": "\uD83C\uDDF7\uD83C\uDDFA",
    "CA": "\uD83C\uDDE8\uD83C\uDDE6",
    "AU": "\uD83C\uDDE6\uD83C\uDDFA",
    "BR": "\uD83C\uDDE7\uD83C\uDDF7",
    "IN": "\uD83C\uDDEE\uD83C\uDDF3",
    "IT": "\uD83C\uDDEE\uD83C\uDDF9",
    "ES": "\uD83C\uDDEA\uD83C\uDDF8",
    "SE": "\uD83C\uDDF8\uD83C\uDDEA",
    "NO": "\uD83C\uDDF3\uD83C\uDDF4",
    "FI": "\uD83C\uDDEB\uD83C\uDDEE",
    "DK": "\uD83C\uDDE9\uD83C\uDDF0",
    "CH": "\uD83C\uDDE8\uD83C\uDDED",
    "AT": "\uD83C\uDDE6\uD83C\uDDF9",
    "BE": "\uD83C\uDDE7\uD83C\uDDEA",
    "IE": "\uD83C\uDDEE\uD83C\uDDEA",
    "PT": "\uD83C\uDDF5\uD83C\uDDF9",
    "GR": "\uD83C\uDDEC\uD83C\uDDF7",
    "PL": "\uD83C\uDDF5\uD83C\uDDF1",
    "CZ": "\uD83C\uDDE8\uD83C\uDDFF",
    "HU": "\uD83C\uDDED\uD83C\uDDFA",
    "SK": "\uD83C\uDDF8\uD83C\uDDF0",
    "SI": "\uD83C\uDDF8\uD83C\uDDEE",
    "HR": "\uD83C\uDDED\uD83C\uDDF7",
    "BG": "\uD83C\uDDE7\uD83C\uDDEC",
    "RO": "\uD83C\uDDF7\uD83C\uDDF4",
    "LT": "\uD83C\uDDF1\uD83C\uDDF9",
    "LV": "\uD83C\uDDF1\uD83C\uDDFB",
    "EE": "\uD83C\uDDEA\uD83C\uDDEA",
    "UA": "\uD83C\uDDFA\uD83C\uDDE6",
    "BY": "\uD83C\uDDE7\uD83C\uDDFE",
    "MD": "\uD83C\uDDF2\uD83C\uDDE9",
    "GE": "\uD83C\uDDEC\uD83C\uDDEA",
    "AM": "\uD83C\uDDE6\uD83C\uDDF2",
    "AZ": "\uD83C\uDDE6\uD83C\uDDFF",
    "KZ": "\uD83C\uDDF0\uD83C\uDDFF",
    "UZ": "\uD83C\uDDFA\uD83C\uDDFF",
    "KG": "\uD83C\uDDF0\uD83C\uDDEC",
    "TJ": "\uD83C\uDDF9\uD83C\uDDEF",
    "TM": "\uD83C\uDDF9\uD83C\uDDF2",
    "MN": "\uD83C\uDDF2\uD83C\uDDF3",
    "MM": "\uD83C\uDDF2\uD83C\uDDF2",
    "LA": "\uD83C\uDDF1\uD83C\uDDE6",
    "KH": "\uD83C\uDDF0\uD83C\uDDED",
    "VN": "\uD83C\uDDFB\uD83C\uDDF3",
    "TH": "\uD83C\uDDF9\uD83C\uDDED",
    "MY": "\uD83C\uDDF2\uD83C\uDDFE",
    "ID": "\uD83C\uDDEE\uD83C\uDDE9",
    "PH": "\uD83C\uDDF5\uD83C\uDDED",
    "BD": "\uD83C\uDDE7\uD83C\uDDE9",
    "PK": "\uD83C\uDDF5\uD83C\uDDF0",
    "LK": "\uD83C\uDDF1\uD83C\uDDF0",
    "NP": "\uD83C\uDDF3\uD83C\uDDF5",
    "AF": "\uD83C\uDDE6\uD83C\uDDEB",
    "IR": "\uD83C\uDDEE\uD83C\uDDF7",
    "IQ": "\uD83C\uDDEE\uD83C\uDDF6",
    "SY": "\uD83C\uDDF8\uD83C\uDDFE",
    "LB": "\uD83C\uDDF1\uD83C\uDDE7",
    "JO": "\uD83C\uDDEF\uD83C\uDDF4",
    "PS": "\uD83C\uDDF5\uD83C\uDDF8",
    "IL": "\uD83C\uDDEE\uD83C\uDDF1",
    "SA": "\uD83C\uDDF8\uD83C\uDDE6",
    "AE": "\uD83C\uDDE6\uD83C\uDDEA",
    "QA": "\uD83C\uDDF6\uD83C\uDDE6",
    "KW": "\uD83C\uDDF0\uD83C\uDDFC",
    "BH": "\uD83C\uDDE7\uD83C\uDDED",
    "OM": "\uD83C\uDDF4\uD83C\uDDF2",
    "YE": "\uD83C\uDDFE\uD83C\uDDEA",
    "EG": "\uD83C\uDDEA\uD83C\uDDEC",
    "LY": "\uD83C\uDDF1\uD83C\uDDFE",
    "TN": "\uD83C\uDDF9\uD83C\uDDF3",
    "DZ": "\uD83C\uDDE9\uD83C\uDDFF",
    "MA": "\uD83C\uDDF2\uD83C\uDDE6",
    "ZA": "\uD83C\uDDFF\uD83C\uDDE6",
    "NG": "\uD83C\uDDF3\uD83C\uDDEC",
    "KE": "\uD83C\uDDF0\uD83C\uDDEA",
    "ET": "\uD83C\uDDEA\uD83C\uDDF9",
    "GH": "\uD83C\uDDEC\uD83C\uDDED",
    "UG": "\uD83C\uDDFA\uD83C\uDDEC",
    "TZ": "\uD83C\uDDF9\uD83C\uDDFF",
    "MZ": "\uD83C\uDDF2\uD83C\uDDFF",
    "ZW": "\uD83C\uDDFF\uD83C\uDDFC",
    "BW": "\uD83C\uDDE7\uD83C\uDDFC",
    "ZM": "\uD83C\uDDFF\uD83C\uDDF2",
    "MW": "\uD83C\uDDF2\uD83C\uDDFC",
    "MG": "\uD83C\uDDF2\uD83C\uDDEC",
    "MU": "\uD83C\uDDF2\uD83C\uDDFA",
    "SC": "\uD83C\uDDF8\uD83C\uDDE8",
    "CV": "\uD83C\uDDE8\uD83C\uDDFB",
    "MX": "\uD83C\uDDF2\uD83C\uDDFD",
    "GT": "\uD83C\uDDEC\uD83C\uDDF9",
    "BZ": "\uD83C\uDDE7\uD83C\uDDFF",
    "CR": "\uD83C\uDDE8\uD83C\uDDF7",
    "PA": "\uD83C\uDDF5\uD83C\uDDE6",
    "CO": "\uD83C\uDDE8\uD83C\uDDF4",
    "VE": "\uD83C\uDDFB\uD83C\uDDEA",
    "GY": "\uD83C\uDDEC\uD83C\uDDFE",
    "SR": "\uD83C\uDDF8\uD83C\uDDF7",
    "GF": "\uD83C\uDDEC\uD83C\uDDEB",
    "EC": "\uD83C\uDDEA\uD83C\uDDE8",
    "PE": "\uD83C\uDDF5\uD83C\uDDEA",
    "BO": "\uD83C\uDDE7\uD83C\uDDF4",
    "PY": "\uD83C\uDDF5\uD83C\uDDFE",
    "UY": "\uD83C\uDDFA\uD83C\uDDFE",
    "AR": "\uD83C\uDDE6\uD83C\uDDF7",
    "CL": "\uD83C\uDDE8\uD83C\uDDF1",
    "FK": "\uD83C\uDDEB\uD83C\uDDF0",
    "NZ": "\uD83C\uDDF3\uD83C\uDDFF",
    "FJ": "\uD83C\uDDEB\uD83C\uDDEF",
    "NC": "\uD83C\uDDF3\uD83C\uDDE8",
    "PG": "\uD83C\uDDF5\uD83C\uDDEC",
    "SB": "\uD83C\uDDF8\uD83C\uDDE7",
    "VU": "\uD83C\uDDFB\uD83C\uDDFA",
    "TO": "\uD83C\uDDF9\uD83C\uDDF4",
    "WS": "\uD83C\uDDFC\uD83C\uDDF8",
    "KI": "\uD83C\uDDF0\uD83C\uDDEE",
    "TV": "\uD83C\uDDF9\uD83C\uDDFB",
    "NR": "\uD83C\uDDF3\uD83C\uDDF7",
    "PW": "\uD83C\uDDF5\uD83C\uDDFC",
    "FM": "\uD83C\uDDEB\uD83C\uDDF2",
    "MH": "\uD83C\uDDF2\uD83C\uDDED",
    "MP": "\uD83C\uDDF2\uD83C\uDDF5",
    "GU": "\uD83C\uDDEC\uD83C\uDDFA",
    "AS": "\uD83C\uDDE6\uD83C\uDDF8",
    "PR": "\uD83C\uDDF5\uD83C\uDDF7",
    "VI": "\uD83C\uDDFB\uD83C\uDDEE",
    "TC": "\uD83C\uDDF9\uD83C\uDDE8",
    "VG": "\uD83C\uDDFB\uD83C\uDDEC",
    "AI": "\uD83C\uDDE6\uD83C\uDDEE"
};
// \u56fd\u5bb6\u4ee3\u7801\u5230\u4e2d\u6587\u540d\u79f0\u7684\u6620\u5c04
const countryNames = {
    "CN": "\u4e2d\u56fd",
    "US": "\u7f8e\u56fd",
    "JP": "\u65e5\u672c",
    "KR": "\u97e9\u56fd",
    "SG": "\u65b0\u52a0\u5761",
    "HK": "\u9999\u6e2f",
    "TW": "\u53f0\u6e7e",
    "GB": "\u82f1\u56fd",
    "UK": "\u82f1\u56fd",
    "DE": "\u5fb7\u56fd",
    "FR": "\u6cd5\u56fd",
    "NL": "\u8377\u5170",
    "RU": "\u4fc4\u7f57\u65af",
    "CA": "\u52a0\u62ff\u5927",
    "AU": "\u6fb3\u5927\u5229\u4e9a",
    "BR": "\u5df4\u897f",
    "IN": "\u5370\u5ea6",
    "IT": "\u610f\u5927\u5229",
    "ES": "\u897f\u73ed\u7259",
    "SE": "\u745e\u5178",
    "NO": "\u632a\u5a01",
    "FI": "\u82ac\u5170",
    "DK": "\u4e39\u9ea6",
    "CH": "\u745e\u58eb",
    "AT": "\u5965\u5730\u5229",
    "BE": "\u6bd4\u5229\u65f6",
    "IE": "\u7231\u5c14\u5170",
    "PT": "\u8461\u8404\u7259",
    "GR": "\u5e0c\u814a",
    "PL": "\u6ce2\u5170",
    "CZ": "\u6377\u514b",
    "HU": "\u5308\u7259\u5229",
    "SK": "\u65af\u6d1b\u4f10\u514b",
    "SI": "\u65af\u6d1b\u6587\u5c3c\u4e9a",
    "HR": "\u514b\u7f57\u5730\u4e9a",
    "BG": "\u4fdd\u52a0\u5229\u4e9a",
    "RO": "\u7f57\u9a6c\u5c3c\u4e9a",
    "LT": "\u7acb\u9676\u5b9b",
    "LV": "\u62c9\u8131\u7ef4\u4e9a",
    "EE": "\u7231\u6c99\u5c3c\u4e9a",
    "UA": "\u4e4c\u514b\u5170",
    "BY": "\u767d\u4fc4\u7f57\u65af",
    "MD": "\u6469\u5c14\u591a\u74e6",
    "GE": "\u683c\u9c81\u5409\u4e9a",
    "AM": "\u4e9a\u7f8e\u5c3c\u4e9a",
    "AZ": "\u963f\u585e\u62dc\u7586",
    "KZ": "\u54c8\u8428\u514b\u65af\u5766",
    "UZ": "\u4e4c\u5179\u522b\u514b\u65af\u5766",
    "KG": "\u5409\u5c14\u5409\u65af\u65af\u5766",
    "TJ": "\u5854\u5409\u514b\u65af\u5766",
    "TM": "\u571f\u5e93\u66fc\u65af\u5766",
    "MN": "\u8499\u53e4",
    "MM": "\u7f05\u7538",
    "LA": "\u8001\u631d",
    "KH": "\u67ec\u57d4\u5be8",
    "VN": "\u8d8a\u5357",
    "TH": "\u6cf0\u56fd",
    "MY": "\u9a6c\u6765\u897f\u4e9a",
    "ID": "\u5370\u5ea6\u5c3c\u897f\u4e9a",
    "PH": "\u83f2\u5f8b\u5bbe",
    "BD": "\u5b5f\u52a0\u62c9\u56fd",
    "PK": "\u5df4\u57fa\u65af\u5766",
    "LK": "\u65af\u91cc\u5170\u5361",
    "NP": "\u5c3c\u6cca\u5c14",
    "AF": "\u963f\u5bcc\u6c57",
    "IR": "\u4f0a\u6717",
    "IQ": "\u4f0a\u62c9\u514b",
    "SY": "\u53d9\u5229\u4e9a",
    "LB": "\u9ece\u5df4\u5ae9",
    "JO": "\u7ea6\u65e6",
    "PS": "\u5df4\u52d2\u65af\u5766",
    "IL": "\u4ee5\u8272\u5217",
    "SA": "\u6c99\u7279\u963f\u62c9\u4f2f",
    "AE": "\u963f\u8054\u914b",
    "QA": "\u5361\u5854\u5c14",
    "KW": "\u79d1\u5a01\u7279",
    "BH": "\u5df4\u6797",
    "OM": "\u963f\u66fc",
    "YE": "\u4e5f\u95e8",
    "EG": "\u57c3\u53ca",
    "LY": "\u5229\u6bd4\u4e9a",
    "TN": "\u7a81\u5c3c\u65af",
    "DZ": "\u963f\u5c14\u53ca\u5229\u4e9a",
    "MA": "\u6469\u6d1b\u54e5",
    "ZA": "\u5357\u975e",
    "NG": "\u5c3c\u65e5\u5229\u4e9a",
    "KE": "\u80af\u5c3c\u4e9a",
    "ET": "\u57c3\u585e\u4fc4\u6bd4\u4e9a",
    "GH": "\u52a0\u7eb3",
    "UG": "\u4e4c\u5e72\u8fbe",
    "TZ": "\u5766\u6851\u5c3c\u4e9a",
    "MZ": "\u83ab\u6851\u6bd4\u514b",
    "ZW": "\u6d25\u5df4\u5e03\u97e6",
    "BW": "\u535a\u8328\u74e6\u7eb3",
    "ZM": "\u8d5e\u6bd4\u4e9a",
    "MW": "\u9a6c\u62c9\u7ef4",
    "MG": "\u9a6c\u8fbe\u52a0\u65af\u52a0",
    "MU": "\u6bdb\u91cc\u6c42\u65af",
    "SC": "\u585e\u820c\u5c14",
    "CV": "\u4f5b\u5f97\u89d2",
    "MX": "\u58a8\u897f\u54e5",
    "GT": "\u5371\u5730\u9a6c\u62c9",
    "BZ": "\u4f2f\u5229\u5179",
    "CR": "\u54e5\u65af\u8fbe\u9ece\u52a0",
    "PA": "\u5df4\u62ff\u9a6c",
    "CO": "\u54e5\u4f26\u6bd4\u4e9a",
    "VE": "\u59d4\u5185\u745e\u62c9",
    "GY": "\u572d\u4e9a\u90a3",
    "SR": "\u82cf\u91cc\u5357",
    "GF": "\u6cd5\u5c5e\u572d\u4e9a\u90a3",
    "EC": "\u5384\u74dc\u591a\u5c14",
    "PE": "\u79d8\u9c81",
    "BO": "\u73bb\u5229\u7ef4\u4e9a",
    "PY": "\u5df4\u62c9\u572d",
    "UY": "\u4e4c\u62c9\u572d",
    "AR": "\u963f\u6839\u5ef7",
    "CL": "\u667a\u5229",
    "FK": "\u798f\u514b\u5170\u7fa4\u5c9b",
    "NZ": "\u65b0\u897f\u5170",
    "FJ": "\u6590\u6d4e",
    "NC": "\u65b0\u5580\u91cc\u591a\u5c3c\u4e9a",
    "PG": "\u5df4\u5e03\u4e9a\u65b0\u51e0\u5185\u4e9a",
    "SB": "\u6240\u7f57\u95e8\u7fa4\u5c9b",
    "VU": "\u74e6\u52aa\u963f\u56fe",
    "TO": "\u6c64\u52a0",
    "WS": "\u8428\u6469\u4e9a",
    "KI": "\u57fa\u91cc\u5df4\u65af",
    "TV": "\u56fe\u74e6\u5362",
    "NR": "\u7459\u9c81",
    "PW": "\u5e15\u52b3",
    "FM": "\u5bc6\u514b\u7f57\u5c3c\u897f\u4e9a",
    "MH": "\u9a6c\u7ecd\u5c14\u7fa4\u5c9b",
    "MP": "\u5317\u9a6c\u91cc\u4e9a\u7eb3\u7fa4\u5c9b",
    "GU": "\u5173\u5c9b",
    "AS": "\u7f8e\u5c5e\u8428\u6469\u4e9a",
    "PR": "\u6ce2\u591a\u9ece\u5404",
    "VI": "\u7f8e\u5c5e\u7ef4\u5c14\u4eac\u7fa4\u5c9b",
    "TC": "\u7279\u514b\u65af\u548c\u51ef\u79d1\u65af\u7fa4\u5c9b",
    "VG": "\u82f1\u5c5e\u7ef4\u5c14\u4eac\u7fa4\u5c9b",
    "AI": "\u5b89\u572d\u62c9"
};
// IP\u5730\u5740\u7f13\u5b58 - \u7528\u4e8e\u907f\u514d\u91cd\u590d\u67e5\u8be2
const locationCache = new Map();
const CACHE_EXPIRY = 86400000 // 24\u5c0f\u65f6\u7f13\u5b58\u8fc7\u671f\u65f6\u95f4
;
async function detectLocationOnline(host) {
    const cleanHost = host.toLowerCase().trim();
    // \u68c0\u67e5\u7f13\u5b58
    const cached = locationCache.get(cleanHost);
    if (cached && Date.now() - cached.timestamp < CACHE_EXPIRY) return cached.data;
    // \u5904\u7406\u7279\u6b8a\u5730\u5740
    if (cleanHost === "127.0.0.1" || cleanHost === "localhost") {
        const result = {
            location: "\u672c\u5730\u4e3b\u673a",
            countryCode: "LOCALHOST",
            flag: "\uD83D\uDCBB"
        };
        locationCache.set(cleanHost, {
            data: result,
            timestamp: Date.now()
        });
        return result;
    }
    // \u68c0\u67e5\u79c1\u6709IP\u5730\u5740
    if (/^\d+\.\d+\.\d+\.\d+$/.test(cleanHost)) {
        const segments = cleanHost.split(".").map(Number);
        const [first, second] = segments;
        if (first === 192 && second === 168) {
            const result = {
                location: "\u672c\u5730\u7f51\u7edc",
                countryCode: "LOCAL",
                flag: "\uD83C\uDFE0"
            };
            locationCache.set(cleanHost, {
                data: result,
                timestamp: Date.now()
            });
            return result;
        }
        if (first === 10) {
            const result = {
                location: "\u672c\u5730\u7f51\u7edc",
                countryCode: "LOCAL",
                flag: "\uD83C\uDFE0"
            };
            locationCache.set(cleanHost, {
                data: result,
                timestamp: Date.now()
            });
            return result;
        }
        if (first === 172 && second >= 16 && second <= 31) {
            const result = {
                location: "\u672c\u5730\u7f51\u7edc",
                countryCode: "LOCAL",
                flag: "\uD83C\uDFE0"
            };
            locationCache.set(cleanHost, {
                data: result,
                timestamp: Date.now()
            });
            return result;
        }
    }
    // \u5982\u679c\u662f\u57df\u540d\uff0c\u5148\u8fdb\u884c\u57df\u540d\u540e\u7f00\u5feb\u901f\u5224\u65ad
    let targetIP = cleanHost;
    if (!/^\d+\.\d+\.\d+\.\d+$/.test(cleanHost)) {
        const parts = cleanHost.split(".");
        if (parts.length >= 2) {
            const tld = parts[parts.length - 1];
            const domainLocationMap = {
                "cn": {
                    location: "\u4e2d\u56fd",
                    countryCode: "CN",
                    flag: "\uD83C\uDDE8\uD83C\uDDF3"
                },
                "us": {
                    location: "\u7f8e\u56fd",
                    countryCode: "US",
                    flag: "\uD83C\uDDFA\uD83C\uDDF8"
                },
                "jp": {
                    location: "\u65e5\u672c",
                    countryCode: "JP",
                    flag: "\uD83C\uDDEF\uD83C\uDDF5"
                },
                "kr": {
                    location: "\u97e9\u56fd",
                    countryCode: "KR",
                    flag: "\uD83C\uDDF0\uD83C\uDDF7"
                },
                "sg": {
                    location: "\u65b0\u52a0\u5761",
                    countryCode: "SG",
                    flag: "\uD83C\uDDF8\uD83C\uDDEC"
                },
                "hk": {
                    location: "\u9999\u6e2f",
                    countryCode: "HK",
                    flag: "\uD83C\uDDED\uD83C\uDDF0"
                },
                "tw": {
                    location: "\u53f0\u6e7e",
                    countryCode: "TW",
                    flag: "\uD83C\uDDF9\uD83C\uDDFC"
                },
                "de": {
                    location: "\u5fb7\u56fd",
                    countryCode: "DE",
                    flag: "\uD83C\uDDE9\uD83C\uDDEA"
                },
                "fr": {
                    location: "\u6cd5\u56fd",
                    countryCode: "FR",
                    flag: "\uD83C\uDDEB\uD83C\uDDF7"
                },
                "nl": {
                    location: "\u8377\u5170",
                    countryCode: "NL",
                    flag: "\uD83C\uDDF3\uD83C\uDDF1"
                },
                "ru": {
                    location: "\u4fc4\u7f57\u65af",
                    countryCode: "RU",
                    flag: "\uD83C\uDDF7\uD83C\uDDFA"
                },
                "ca": {
                    location: "\u52a0\u62ff\u5927",
                    countryCode: "CA",
                    flag: "\uD83C\uDDE8\uD83C\uDDE6"
                },
                "au": {
                    location: "\u6fb3\u5927\u5229\u4e9a",
                    countryCode: "AU",
                    flag: "\uD83C\uDDE6\uD83C\uDDFA"
                },
                "uk": {
                    location: "\u82f1\u56fd",
                    countryCode: "GB",
                    flag: "\uD83C\uDDEC\uD83C\uDDE7"
                }
            };
            if (domainLocationMap[tld]) {
                const result = domainLocationMap[tld];
                locationCache.set(cleanHost, {
                    data: result,
                    timestamp: Date.now()
                });
                return result;
            }
        }
    }
    // \u5c1d\u8bd5\u591a\u4e2a\u514d\u8d39API
    const apis = [
        ()=>fetchFromIPAPI(targetIP),
        ()=>fetchFromIPInfo(targetIP)
    ];
    for (const api of apis)try {
        const result = await api();
        if (result) {
            locationCache.set(cleanHost, {
                data: result,
                timestamp: Date.now()
            });
            // \u901a\u77e5\u76d1\u542c\u5668\u4f4d\u7f6e\u4fe1\u606f\u5df2\u66f4\u65b0
            notifyLocationUpdate(cleanHost, result);
            return result;
        }
    } catch (error) {
        console.warn("API\u8c03\u7528\u5931\u8d25:", error);
        continue;
    }
    // \u6240\u6709API\u90fd\u5931\u8d25\uff0c\u8fd4\u56de\u9ed8\u8ba4\u503c
    const fallback = {
        location: "\u672a\u77e5",
        countryCode: "UNKNOWN",
        flag: "\uD83C\uDF10"
    };
    locationCache.set(cleanHost, {
        data: fallback,
        timestamp: Date.now()
    });
    notifyLocationUpdate(cleanHost, fallback);
    return fallback;
}
/**
 * \u4f7f\u7528ip-api.com\u83b7\u53d6\u5f52\u5c5e\u5730\u4fe1\u606f\uff08\u514d\u8d39\uff0c\u65e0\u9700API\u5bc6\u94a5\uff09
 */ async function fetchFromIPAPI(ip) {
    try {
        const response = await fetch(`http://ip-api.com/json/${ip}?lang=zh-CN&fields=status,country,countryCode,region,regionName,city,isp,query`, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        });
        if (!response.ok) return null;
        const data = await response.json();
        if (data.status !== "success") return null;
        const countryCode = data.countryCode;
        const flag = countryFlags[countryCode] || "\uD83C\uDF10";
        const countryName = countryNames[countryCode] || data.country;
        return {
            location: data.city ? `${countryName} ${data.city}` : countryName,
            countryCode,
            flag,
            city: data.city,
            region: data.regionName,
            isp: data.isp
        };
    } catch (error) {
        console.warn("IP-API\u8c03\u7528\u5931\u8d25:", error);
        return null;
    }
}
/**
 * \u4f7f\u7528ipinfo.io\u83b7\u53d6\u5f52\u5c5e\u5730\u4fe1\u606f\uff08\u514d\u8d39\uff0c\u4f46\u6709\u8bf7\u6c42\u9650\u5236\uff09
 */ async function fetchFromIPInfo(ip) {
    try {
        const response = await fetch(`https://ipinfo.io/${ip}/json`, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        });
        if (!response.ok) return null;
        const data = await response.json();
        const countryCode = data.country;
        const flag = countryFlags[countryCode] || "\uD83C\uDF10";
        const countryName = countryNames[countryCode] || data.country;
        return {
            location: data.city ? `${countryName} ${data.city}` : countryName,
            countryCode,
            flag,
            city: data.city,
            region: data.region,
            isp: data.org
        };
    } catch (error) {
        console.warn("IPInfo\u8c03\u7528\u5931\u8d25:", error);
        return null;
    }
}
// \u4f7f\u7528\u65e7\u7684IP\u8303\u56f4\u68c0\u6d4b\u4f5c\u4e3a\u5907\u7528\u65b9\u6848
const ipRangeList = [
    // \u4e2d\u56fd
    {
        pattern: /^(1|14|27|36|39|42|58|59|60|61|101|103|106|110|111|112|113|114|115|116|117|118|119|120|121|122|123|124|125)\./,
        info: {
            location: "\u4e2d\u56fd",
            countryCode: "CN",
            flag: "\uD83C\uDDE8\uD83C\uDDF3"
        }
    },
    // \u7f8e\u56fd
    {
        pattern: /^(3|4|6|7|8|9|11|12|13|15|16|17|18|19|20|23|24|34|35|40|44|45|47|50|52|54|63|64|65|66|67|68|69|70|71|72|73|74|75|76)\./,
        info: {
            location: "\u7f8e\u56fd",
            countryCode: "US",
            flag: "\uD83C\uDDFA\uD83C\uDDF8"
        }
    },
    // \u5176\u4ed6\u56fd\u5bb6
    {
        pattern: /^(126|133|153|210|211|218|219|220)\./,
        info: {
            location: "\u65e5\u672c",
            countryCode: "JP",
            flag: "\uD83C\uDDEF\uD83C\uDDF5"
        }
    }
];
function detectLocation(host) {
    const cleanHost = host.toLowerCase().trim();
    // \u68c0\u67e5\u7f13\u5b58
    const cached = locationCache.get(cleanHost);
    if (cached && Date.now() - cached.timestamp < CACHE_EXPIRY) return cached.data;
    // \u5feb\u901f\u68c0\u67e5\u7279\u6b8a\u5730\u5740
    if (cleanHost === "127.0.0.1" || cleanHost === "localhost") return {
        location: "\u672c\u5730\u4e3b\u673a",
        countryCode: "LOCALHOST",
        flag: "\uD83D\uDCBB"
    };
    // \u68c0\u67e5\u79c1\u6709IP
    if (/^\d+\.\d+\.\d+\.\d+$/.test(cleanHost)) {
        const segments = cleanHost.split(".").map(Number);
        const [first, second] = segments;
        if (first === 192 && second === 168) return {
            location: "\u672c\u5730\u7f51\u7edc",
            countryCode: "LOCAL",
            flag: "\ufffd"
        };
        if (first === 10) return {
            location: "\u672c\u5730\u7f51\u7edc",
            countryCode: "LOCAL",
            flag: "\ufffd"
        };
        if (first === 172 && second >= 16 && second <= 31) return {
            location: "\u672c\u5730\u7f51\u7edc",
            countryCode: "LOCAL",
            flag: "\ufffd"
        };
        // \u5c1d\u8bd5\u4f7f\u7528\u5907\u7528IP\u6bb5\u68c0\u6d4b
        for (const { pattern, info } of ipRangeList){
            if (pattern.test(cleanHost)) return info;
        }
    }
    // \u57df\u540d\u540e\u7f00\u5feb\u901f\u5224\u65ad
    if (!/^\d+\.\d+\.\d+\.\d+$/.test(cleanHost)) {
        const parts = cleanHost.split(".");
        if (parts.length >= 2) {
            const tld = parts[parts.length - 1];
            const domainLocationMap = {
                "cn": {
                    location: "\u4e2d\u56fd",
                    countryCode: "CN",
                    flag: "\uD83C\uDDE8\uD83C\uDDF3"
                },
                "us": {
                    location: "\u7f8e\u56fd",
                    countryCode: "US",
                    flag: "\uD83C\uDDFA\uD83C\uDDF8"
                },
                "jp": {
                    location: "\u65e5\u672c",
                    countryCode: "JP",
                    flag: "\uD83C\uDDEF\uD83C\uDDF5"
                },
                "kr": {
                    location: "\u97e9\u56fd",
                    countryCode: "KR",
                    flag: "\uD83C\uDDF0\uD83C\uDDF7"
                },
                "sg": {
                    location: "\u65b0\u52a0\u5761",
                    countryCode: "SG",
                    flag: "\uD83C\uDDF8\uD83C\uDDEC"
                },
                "hk": {
                    location: "\u9999\u6e2f",
                    countryCode: "HK",
                    flag: "\uD83C\uDDED\uD83C\uDDF0"
                },
                "tw": {
                    location: "\u53f0\u6e7e",
                    countryCode: "TW",
                    flag: "\uD83C\uDDF9\uD83C\uDDFC"
                },
                "de": {
                    location: "\u5fb7\u56fd",
                    countryCode: "DE",
                    flag: "\uD83C\uDDE9\uD83C\uDDEA"
                },
                "fr": {
                    location: "\u6cd5\u56fd",
                    countryCode: "FR",
                    flag: "\uD83C\uDDEB\uD83C\uDDF7"
                },
                "nl": {
                    location: "\u8377\u5170",
                    countryCode: "NL",
                    flag: "\uD83C\uDDF3\uD83C\uDDF1"
                },
                "ru": {
                    location: "\u4fc4\u7f57\u65af",
                    countryCode: "RU",
                    flag: "\uD83C\uDDF7\uD83C\uDDFA"
                },
                "ca": {
                    location: "\u52a0\u62ff\u5927",
                    countryCode: "CA",
                    flag: "\uD83C\uDDE8\uD83C\uDDE6"
                },
                "au": {
                    location: "\u6fb3\u5927\u5229\u4e9a",
                    countryCode: "AU",
                    flag: "\uD83C\uDDE6\uD83C\uDDFA"
                },
                "uk": {
                    location: "\u82f1\u56fd",
                    countryCode: "GB",
                    flag: "\ufffd\ufffd"
                }
            };
            if (domainLocationMap[tld]) return domainLocationMap[tld];
        }
    }
    // \u5982\u679c\u7f13\u5b58\u4e2d\u6ca1\u6709\uff0c\u8fd4\u56de"\u67e5\u8be2\u4e2d"\u5e76\u89e6\u53d1\u5f02\u6b65\u67e5\u8be2
    detectLocationOnline(cleanHost).then((result)=>{
    // \u5f02\u6b65\u67e5\u8be2\u5b8c\u6210\u540e\u4f1a\u81ea\u52a8\u89e6\u53d1notifyLocationUpdate
    }).catch(console.error);
    return {
        location: "\u67e5\u8be2\u4e2d...",
        countryCode: "LOADING",
        flag: "\uD83D\uDD0D"
    };
}
function getLocationDisplay(host) {
    const info = detectLocation(host);
    return `${info.flag} ${info.location}`;
}
function getLocationShort(host) {
    const info = detectLocation(host);
    return info.location;
}
function clearLocationCache() {
    locationCache.clear();
}
async function preloadLocations(hosts) {
    const promises = hosts.map((host)=>detectLocationOnline(host).catch((error)=>{
            console.warn(`\u9884\u52a0\u8f7dIP ${host} \u5931\u8d25:`, error);
            return null;
        }));
    await Promise.allSettled(promises);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"iIXqM"}],"iIXqM":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"gVeMk":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "applyProxy", ()=>applyProxy);
parcelHelpers.export(exports, "disableProxy", ()=>disableProxy);
parcelHelpers.export(exports, "setBadge", ()=>setBadge);
parcelHelpers.export(exports, "clearBadge", ()=>clearBadge);
parcelHelpers.export(exports, "showNotification", ()=>showNotification);
parcelHelpers.export(exports, "checkProxyConnection", ()=>checkProxyConnection);
parcelHelpers.export(exports, "getCurrentProxySettings", ()=>getCurrentProxySettings);
const applyProxy = async (config)=>{
    const proxyConfig = {
        mode: "fixed_servers",
        rules: {
            singleProxy: {
                scheme: config.type,
                host: config.host,
                port: config.port
            },
            bypassList: [
                "localhost",
                "127.0.0.1",
                "<local>"
            ]
        }
    };
    return new Promise((resolve, reject)=>{
        chrome.proxy.settings.set({
            value: proxyConfig,
            scope: "regular"
        }, ()=>{
            if (chrome.runtime.lastError) reject(new Error(chrome.runtime.lastError.message));
            else resolve();
        });
    });
};
const disableProxy = async ()=>{
    const config = {
        mode: "system"
    };
    return new Promise((resolve, reject)=>{
        chrome.proxy.settings.set({
            value: config,
            scope: "regular"
        }, ()=>{
            if (chrome.runtime.lastError) reject(new Error(chrome.runtime.lastError.message));
            else resolve();
        });
    });
};
const setBadge = (text, color = "#4CAF50")=>{
    chrome.action.setBadgeText({
        text
    });
    chrome.action.setBadgeBackgroundColor({
        color
    });
};
const clearBadge = ()=>{
    chrome.action.setBadgeText({
        text: ""
    });
};
const showNotification = (title, message)=>{
    chrome.notifications.create({
        type: "basic",
        iconUrl: "icon.png",
        title,
        message
    });
};
const checkProxyConnection = async (config)=>{
    try {
        // \u8fd9\u91cc\u53ef\u4ee5\u6dfb\u52a0\u5b9e\u9645\u7684\u8fde\u63a5\u6d4b\u8bd5\u903b\u8f91
        // \u6bd4\u5982\u901a\u8fc7fetch\u8bf7\u6c42\u6d4b\u8bd5\u4ee3\u7406\u662f\u5426\u53ef\u7528
        return true;
    } catch (error) {
        console.error("Proxy connection test failed:", error);
        return false;
    }
};
const getCurrentProxySettings = async ()=>{
    return new Promise((resolve)=>{
        chrome.proxy.settings.get({}, (details)=>{
            resolve(details.value);
        });
    });
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"iIXqM"}]},["gOBYX","8oeFb"], "8oeFb", "parcelRequired662")

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SUFBUSxNQUFNO0lBQVEsTUFBTTtJQUM5RCxNQUFNO0lBQVEsTUFBTTtJQUFRLE1BQU07SUFBUSxNQUFNO0lBQVEsTUFBTTtJQUM5RCxNQUFNO0lBQVEsTUFBTTtJQUFRLE1BQU07SUFBUSxNQUFNO0lBQVEsTUFBTTtJQUM5RCxNQUFNO0lBQVEsTUFBTTtJQUFRLE1BQU07SUFBUSxNQUFNO0lBQVEsTUFBTTtJQUM5RCxNQUFNO0lBQVEsTUFBTTtJQUFRLE1BQU07SUFBUSxNQUFNO0lBQVEsTUFBTTtJQUM5RCxNQUFNO0lBQVEsTUFBTTtJQUFRLE1BQU07SUFBUSxNQUFNO0lBQVEsTUFBTTtJQUM5RCxNQUFNO0lBQVEsTUFBTTtJQUFRLE1BQU07SUFBUSxNQUFNO0lBQVEsTUFBTTtJQUM5RCxNQUFNO0lBQVEsTUFBTTtJQUFRLE1BQU07SUFBUSxNQUFNO0lBQVEsTUFBTTtJQUM5RCxNQUFNO0lBQVEsTUFBTTtJQUFRLE1BQU07SUFBUSxNQUFNO0lBQVEsTUFBTTtJQUM5RCxNQUFNO0lBQVEsTUFBTTtJQUFRLE1BQU07SUFBUSxNQUFNO0lBQVEsTUFBTTtJQUM5RCxNQUFNO0lBQVEsTUFBTTtJQUFRLE1BQU07SUFBUSxNQUFNO0lBQVEsTUFBTTtJQUM5RCxNQUFNO0lBQVEsTUFBTTtJQUFRLE1BQU07SUFBUSxNQUFNO0lBQVEsTUFBTTtJQUM5RCxNQUFNO0lBQVEsTUFBTTtJQUFRLE1BQU07SUFBUSxNQUFNO0lBQVEsTUFBTTtJQUM5RCxNQUFNO0lBQVEsTUFBTTtJQUFRLE1BQU07SUFBUSxNQUFNO0lBQVEsTUFBTTtJQUM5RCxNQUFNO0lBQVEsTUFBTTtJQUFRLE1BQU07SUFBUSxNQUFNO0lBQVEsTUFBTTtJQUM5RCxNQUFNO0lBQVEsTUFBTTtJQUFRLE1BQU07SUFBUSxNQUFNO0lBQVEsTUFBTTtJQUM5RCxNQUFNO0lBQVEsTUFBTTtJQUFRLE1BQU07SUFBUSxNQUFNO0lBQVEsTUFBTTtJQUM5RCxNQUFNO0lBQVEsTUFBTTtJQUFRLE1BQU07SUFBUSxNQUFNO0lBQVEsTUFBTTtJQUM5RCxNQUFNO0lB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QVMsSUFBSSxDQUFDLEdBQUcsQ0FBQztZQUM3QixRQUFRLFFBQVE7UUFDbEI7SUFDRjtBQUNGIiwic291cmNlcyI6WyJub2RlX21vZHVsZXMvQHBsYXNtb2hxL3BhcmNlbC1ydW50aW1lL2Rpc3QvcnVudGltZS1kODcyOTlkMzFlODJjNDAyLmpzIiwiLnBsYXNtby9zdGF0aWMvYmFja2dyb3VuZC9pbmRleC50cyIsImJhY2tncm91bmQudHMiLCJ1dGlscy9zdG9yYWdlLnRzIiwidXRpbHMvbG9jYXRpb24udHMiLCJub2RlX21vZHVsZXMvQHBhcmNlbC90cmFuc2Zvcm1lci1qcy9zcmMvZXNtb2R1bGUtaGVscGVycy5qcyIsInV0aWxzL3Byb3h5LnRzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciB1PWdsb2JhbFRoaXMucHJvY2Vzcz8uYXJndnx8W107dmFyIGg9KCk9Pmdsb2JhbFRoaXMucHJvY2Vzcz8uZW52fHx7fTt2YXIgQj1uZXcgU2V0KHUpLF89ZT0+Qi5oYXMoZSksRz11LmZpbHRlcihlPT5lLnN0YXJ0c1dpdGgoXCItLVwiKSYmZS5pbmNsdWRlcyhcIj1cIikpLm1hcChlPT5lLnNwbGl0KFwiPVwiKSkucmVkdWNlKChlLFt0LG9dKT0+KGVbdF09byxlKSx7fSk7dmFyIFU9XyhcIi0tZHJ5LXJ1blwiKSxnPSgpPT5fKFwiLS12ZXJib3NlXCIpfHxoKCkuVkVSQk9TRT09PVwidHJ1ZVwiLE49ZygpO3ZhciBtPShlPVwiXCIsLi4udCk9PmNvbnNvbGUubG9nKGUucGFkRW5kKDkpLFwifFwiLC4uLnQpO3ZhciB5PSguLi5lKT0+Y29uc29sZS5lcnJvcihcIlxcdXsxRjUzNH0gRVJST1JcIi5wYWRFbmQoOSksXCJ8XCIsLi4uZSksdj0oLi4uZSk9Pm0oXCJcXHV7MUY1MzV9IElORk9cIiwuLi5lKSxmPSguLi5lKT0+bShcIlxcdXsxRjdFMH0gV0FSTlwiLC4uLmUpLE09MCxpPSguLi5lKT0+ZygpJiZtKGBcXHV7MUY3RTF9ICR7TSsrfWAsLi4uZSk7dmFyIGI9KCk9PntsZXQgZT1nbG9iYWxUaGlzLmJyb3dzZXI/LnJ1bnRpbWV8fGdsb2JhbFRoaXMuY2hyb21lPy5ydW50aW1lLHQ9KCk9PnNldEludGVydmFsKGUuZ2V0UGxhdGZvcm1JbmZvLDI0ZTMpO2Uub25TdGFydHVwLmFkZExpc3RlbmVyKHQpLHQoKX07dmFyIG49e1wiaXNDb250ZW50U2NyaXB0XCI6ZmFsc2UsXCJpc0JhY2tncm91bmRcIjp0cnVlLFwiaXNSZWFjdFwiOmZhbHNlLFwicnVudGltZXNcIjpbXCJiYWNrZ3JvdW5kLXNlcnZpY2UtcnVudGltZVwiXSxcImhvc3RcIjpcImxvY2FsaG9zdFwiLFwicG9ydFwiOjE4MTUsXCJlbnRyeUZpbGVQYXRoXCI6XCIvVXNlcnMvaW90MDIvYWlXb3JrL3Byb3h5LXN3aXRjaC8ucGxhc21vL3N0YXRpYy9iYWNrZ3JvdW5kL2luZGV4LnRzXCIsXCJidW5kbGVJZFwiOlwiYzMzODkwOGU3MDRjOTFmMVwiLFwiZW52SGFzaFwiOlwiZDk5YTVmZmE1N2FjZDYzOFwiLFwidmVyYm9zZVwiOlwiZmFsc2VcIixcInNlY3VyZVwiOmZhbHNlLFwic2VydmVyUG9ydFwiOjU4Njk5fTttb2R1bGUuYnVuZGxlLkhNUl9CVU5ETEVfSUQ9bi5idW5kbGVJZDtnbG9iYWxUaGlzLnByb2Nlc3M9e2FyZ3Y6W10sZW52OntWRVJCT1NFOm4udmVyYm9zZX19O3ZhciBEPW1vZHVsZS5idW5kbGUuTW9kdWxlO2Z1bmN0aW9uIEgoZSl7RC5jYWxsKHRoaXMsZSksdGhpcy5ob3Q9e2RhdGE6bW9kdWxlLmJ1bmRsZS5ob3REYXRhW2VdLF9hY2NlcHRDYWxsYmFja3M6W10sX2Rpc3Bvc2VDYWxsYmFja3M6W10sYWNjZXB0OmZ1bmN0aW9uKHQpe3RoaXMuX2FjY2VwdENhbGxiYWNrcy5wdXNoKHR8fGZ1bmN0aW9uKCl7fSl9LGRpc3Bvc2U6ZnVuY3Rpb24odCl7dGhpcy5fZGlzcG9zZUNhbGxiYWNrcy5wdXNoKHQpfX0sbW9kdWxlLmJ1bmRsZS5ob3REYXRhW2VdPXZvaWQgMH1tb2R1bGUuYnVuZGxlLk1vZHVsZT1IO21vZHVsZS5idW5kbGUuaG90RGF0YT17fTt2YXIgYz1nbG9iYWxUaGlzLmJyb3dzZXJ8fGdsb2JhbFRoaXMuY2hyb21lfHxudWxsO2Z1bmN0aW9uIFIoKXtyZXR1cm4hbi5ob3N0fHxuLmhvc3Q9PT1cIjAuMC4wLjBcIj9sb2NhdGlvbi5wcm90b2NvbC5pbmRleE9mKFwiaHR0cFwiKT09PTA/bG9jYXRpb24uaG9zdG5hbWU6XCJsb2NhbGhvc3RcIjpuLmhvc3R9ZnVuY3Rpb24geCgpe3JldHVybiFuLmhvc3R8fG4uaG9zdD09PVwiMC4wLjAuMFwiP1wibG9jYWxob3N0XCI6bi5ob3N0fWZ1bmN0aW9uIGQoKXtyZXR1cm4gbi5wb3J0fHxsb2NhdGlvbi5wb3J0fXZhciBQPVwiX19wbGFzbW9fcnVudGltZV9wYWdlX1wiLFM9XCJfX3BsYXNtb19ydW50aW1lX3NjcmlwdF9cIjt2YXIgTz1gJHtuLnNlY3VyZT9cImh0dHBzXCI6XCJodHRwXCJ9Oi8vJHtSKCl9OiR7ZCgpfS9gO2FzeW5jIGZ1bmN0aW9uIGsoZT0xNDcwKXtmb3IoOzspdHJ5e2F3YWl0IGZldGNoKE8pO2JyZWFrfWNhdGNoe2F3YWl0IG5ldyBQcm9taXNlKG89PnNldFRpbWVvdXQobyxlKSl9fWlmKGMucnVudGltZS5nZXRNYW5pZmVzdCgpLm1hbmlmZXN0X3ZlcnNpb249PT0zKXtsZXQgZT1jLnJ1bnRpbWUuZ2V0VVJMKFwiL19fcGxhc21vX2htcl9wcm94eV9fP3VybD1cIik7Z2xvYmFsVGhpcy5hZGRFdmVudExpc3RlbmVyKFwiZmV0Y2hcIixmdW5jdGlvbih0KXtsZXQgbz10LnJlcXVlc3QudXJsO2lmKG8uc3RhcnRzV2l0aChlKSl7bGV0IHM9bmV3IFVSTChkZWNvZGVVUklDb21wb25lbnQoby5zbGljZShlLmxlbmd0aCkpKTtzLmhvc3RuYW1lPT09bi5ob3N0JiZzLnBvcnQ9PT1gJHtuLnBvcnR9YD8ocy5zZWFyY2hQYXJhbXMuc2V0KFwidFwiLERhdGUubm93KCkudG9TdHJpbmcoKSksdC5yZXNwb25kV2l0aChmZXRjaChzKS50aGVuKHI9Pm5ldyBSZXNwb25zZShyLmJvZHkse2hlYWRlcnM6e1wiQ29udGVudC1UeXBlXCI6ci5oZWFkZXJzLmdldChcIkNvbnRlbnQtVHlwZVwiKT8/XCJ0ZXh0L2phdmFzY3JpcHRcIn19KSkpKTp0LnJlc3BvbmRXaXRoKG5ldyBSZXNwb25zZShcIlBsYXNtbyBITVJcIix7c3RhdHVzOjIwMCxzdGF0dXNUZXh0OlwiVGVzdGluZ1wifSkpfX0pfWZ1bmN0aW9uIEUoZSx0KXtsZXR7bW9kdWxlczpvfT1lO3JldHVybiBvPyEhb1t0XTohMX1mdW5jdGlvbiBDKGU9ZCgpKXtsZXQgdD14KCk7cmV0dXJuYCR7bi5zZWN1cmV8fGxvY2F0aW9uLnByb3RvY29sPT09XCJodHRwczpcIiYmIS9sb2NhbGhvc3R8MTI3LjAuMC4xfDAuMC4wLjAvLnRlc3QodCk/XCJ3c3NcIjpcIndzXCJ9Oi8vJHt0fToke2V9L2B9ZnVuY3Rpb24gTChlKXt0eXBlb2YgZS5tZXNzYWdlPT1cInN0cmluZ1wiJiZ5KFwiW3BsYXNtby9wYXJjZWwtcnVudGltZV06IFwiK2UubWVzc2FnZSl9ZnVuY3Rpb24gVChlKXtpZih0eXBlb2YgZ2xvYmFsVGhpcy5XZWJTb2NrZXQ+XCJ1XCIpcmV0dXJuO2xldCB0PW5ldyBXZWJTb2NrZXQoQyhOdW1iZXIoZCgpKSsxKSk7cmV0dXJuIHQuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIixhc3luYyBmdW5jdGlvbihvKXtsZXQgcz1KU09OLnBhcnNlKG8uZGF0YSk7YXdhaXQgZShzKX0pLHQuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsTCksdH1mdW5jdGlvbiBBKGUpe2lmKHR5cGVvZiBnbG9iYWxUaGlzLldlYlNvY2tldD5cInVcIilyZXR1cm47bGV0IHQ9bmV3IFdlYlNvY2tldChDKCkpO3JldHVybiB0LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsYXN5bmMgZnVuY3Rpb24obyl7bGV0IHM9SlNPTi5wYXJzZShvLmRhdGEpO2lmKHMudHlwZT09PVwidXBkYXRlXCImJmF3YWl0IGUocy5hc3NldHMpLHMudHlwZT09PVwiZXJyb3JcIilmb3IobGV0IHIgb2Ygcy5kaWFnbm9zdGljcy5hbnNpKXtsZXQgbD1yLmNvZGVmcmFtZXx8ci5zdGFjaztmKFwiW3BsYXNtby9wYXJjZWwtcnVudGltZV06IFwiK3IubWVzc2FnZStgXG5gK2wrYFxuXG5gK3IuaGludHMuam9pbihgXG5gKSl9fSksdC5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIixMKSx0LmFkZEV2ZW50TGlzdGVuZXIoXCJvcGVuXCIsKCk9Pnt2KGBbcGxhc21vL3BhcmNlbC1ydW50aW1lXTogQ29ubmVjdGVkIHRvIEhNUiBzZXJ2ZXIgZm9yICR7bi5lbnRyeUZpbGVQYXRofWApfSksdC5hZGRFdmVudExpc3RlbmVyKFwiY2xvc2VcIiwoKT0+e2YoYFtwbGFzbW8vcGFyY2VsLXJ1bnRpbWVdOiBDb25uZWN0aW9uIHRvIHRoZSBITVIgc2VydmVyIGlzIGNsb3NlZCBmb3IgJHtuLmVudHJ5RmlsZVBhdGh9YCl9KSx0fXZhciB3PW1vZHVsZS5idW5kbGUucGFyZW50LGE9e2J1aWxkUmVhZHk6ITEsYmdDaGFuZ2VkOiExLGNzQ2hhbmdlZDohMSxwYWdlQ2hhbmdlZDohMSxzY3JpcHRQb3J0czpuZXcgU2V0LHBhZ2VQb3J0czpuZXcgU2V0fTthc3luYyBmdW5jdGlvbiBwKGU9ITEpe2lmKGV8fGEuYnVpbGRSZWFkeSYmYS5wYWdlQ2hhbmdlZCl7aShcIkJHU1cgUnVudGltZSAtIHJlbG9hZGluZyBQYWdlXCIpO2ZvcihsZXQgdCBvZiBhLnBhZ2VQb3J0cyl0LnBvc3RNZXNzYWdlKG51bGwpfWlmKGV8fGEuYnVpbGRSZWFkeSYmKGEuYmdDaGFuZ2VkfHxhLmNzQ2hhbmdlZCkpe2koXCJCR1NXIFJ1bnRpbWUgLSByZWxvYWRpbmcgQ1NcIik7bGV0IHQ9YXdhaXQgYz8udGFicy5xdWVyeSh7YWN0aXZlOiEwfSk7Zm9yKGxldCBvIG9mIGEuc2NyaXB0UG9ydHMpe2xldCBzPXQuc29tZShyPT5yLmlkPT09by5zZW5kZXIudGFiPy5pZCk7by5wb3N0TWVzc2FnZSh7X19wbGFzbW9fY3NfYWN0aXZlX3RhYl9fOnN9KX1jLnJ1bnRpbWUucmVsb2FkKCl9fWlmKCF3fHwhdy5pc1BhcmNlbFJlcXVpcmUpe2IoKTtsZXQgZT1BKGFzeW5jIHQ9PntpKFwiQkdTVyBSdW50aW1lIC0gT24gSE1SIFVwZGF0ZVwiKSxhLmJnQ2hhbmdlZHx8PXQuZmlsdGVyKHM9PnMuZW52SGFzaD09PW4uZW52SGFzaCkuc29tZShzPT5FKG1vZHVsZS5idW5kbGUscy5pZCkpO2xldCBvPXQuZmluZChzPT5zLnR5cGU9PT1cImpzb25cIik7aWYobyl7bGV0IHM9bmV3IFNldCh0Lm1hcChsPT5sLmlkKSkscj1PYmplY3QudmFsdWVzKG8uZGVwc0J5QnVuZGxlKS5tYXAobD0+T2JqZWN0LnZhbHVlcyhsKSkuZmxhdCgpO2EuYmdDaGFuZ2VkfHw9ci5ldmVyeShsPT5zLmhhcyhsKSl9cCgpfSk7ZS5hZGRFdmVudExpc3RlbmVyKFwib3BlblwiLCgpPT57bGV0IHQ9c2V0SW50ZXJ2YWwoKCk9PmUuc2VuZChcInBpbmdcIiksMjRlMyk7ZS5hZGRFdmVudExpc3RlbmVyKFwiY2xvc2VcIiwoKT0+Y2xlYXJJbnRlcnZhbCh0KSl9KSxlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbG9zZVwiLGFzeW5jKCk9Pnthd2FpdCBrKCkscCghMCl9KX1UKGFzeW5jIGU9Pntzd2l0Y2goaShcIkJHU1cgUnVudGltZSAtIE9uIEJ1aWxkIFJlcGFja2FnZWRcIiksZS50eXBlKXtjYXNlXCJidWlsZF9yZWFkeVwiOnthLmJ1aWxkUmVhZHl8fD0hMCxwKCk7YnJlYWt9Y2FzZVwiY3NfY2hhbmdlZFwiOnthLmNzQ2hhbmdlZHx8PSEwLHAoKTticmVha319fSk7Yy5ydW50aW1lLm9uQ29ubmVjdC5hZGRMaXN0ZW5lcihmdW5jdGlvbihlKXtsZXQgdD1lLm5hbWUuc3RhcnRzV2l0aChQKSxvPWUubmFtZS5zdGFydHNXaXRoKFMpO2lmKHR8fG8pe2xldCBzPXQ/YS5wYWdlUG9ydHM6YS5zY3JpcHRQb3J0cztzLmFkZChlKSxlLm9uRGlzY29ubmVjdC5hZGRMaXN0ZW5lcigoKT0+e3MuZGVsZXRlKGUpfSksZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoZnVuY3Rpb24ocil7aShcIkJHU1cgUnVudGltZSAtIE9uIHNvdXJjZSBjaGFuZ2VkXCIsciksci5fX3BsYXNtb19jc19jaGFuZ2VkX18mJihhLmNzQ2hhbmdlZHx8PSEwKSxyLl9fcGxhc21vX3BhZ2VfY2hhbmdlZF9fJiYoYS5wYWdlQ2hhbmdlZHx8PSEwKSxwKCl9KX19KTtjLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKGZ1bmN0aW9uKHQpe3JldHVybiB0Ll9fcGxhc21vX2Z1bGxfcmVsb2FkX18mJihpKFwiQkdTVyBSdW50aW1lIC0gT24gdG9wLWxldmVsIGNvZGUgY2hhbmdlZFwiKSxwKCkpLCEwfSk7XG4iLCJpbXBvcnQgXCIuLi8uLi8uLi9iYWNrZ3JvdW5kXCIiLCJpbXBvcnQgdHlwZSB7IE1lc3NhZ2UsIE1lc3NhZ2VSZXNwb25zZSwgUHJveHlDb25maWcgfSBmcm9tIFwifnV0aWxzL3R5cGVzXCJcbmltcG9ydCB7IGdldFByb3hpZXMsIHNhdmVQcm94aWVzLCBnZXRBY3RpdmVQcm94eSwgc2F2ZUFjdGl2ZVByb3h5LCBhZGRQcm94eSBhcyBhZGRQcm94eVRvU3RvcmFnZSwgdXBkYXRlUHJveHkgYXMgdXBkYXRlUHJveHlJblN0b3JhZ2UsIGRlbGV0ZVByb3h5IGFzIGRlbGV0ZVByb3h5RnJvbVN0b3JhZ2UgfSBmcm9tIFwifnV0aWxzL3N0b3JhZ2VcIlxuaW1wb3J0IHsgYXBwbHlQcm94eSwgZGlzYWJsZVByb3h5LCBzZXRCYWRnZSwgY2xlYXJCYWRnZSB9IGZyb20gXCJ+dXRpbHMvcHJveHlcIlxuXG4vLyDlvZPliY3orqTor4Hkv6Hmga9cbmxldCBjdXJyZW50QXV0aDogeyB1c2VybmFtZTogc3RyaW5nOyBwYXNzd29yZDogc3RyaW5nIH0gfCBudWxsID0gbnVsbFxuXG4vLyDmianlsZXlronoo4Xml7bnmoTliJ3lp4vljJZcbmNocm9tZS5ydW50aW1lLm9uSW5zdGFsbGVkLmFkZExpc3RlbmVyKCgpID0+IHtcbiAgY29uc29sZS5sb2coJ01vZGVybiBQcm94eSBTd2l0Y2ggaW5zdGFsbGVkJylcbiAgLy8g56Gu5L+d5Luj55CG6KKr5YWz6ZetXG4gIGRpc2FibGVQcm94eSgpLmNhdGNoKGNvbnNvbGUuZXJyb3IpXG4gIGNsZWFyQmFkZ2UoKVxufSlcblxuLy8g5rWP6KeI5Zmo5ZCv5Yqo5pe25oGi5aSN5Luj55CG54q25oCBXG5jaHJvbWUucnVudGltZS5vblN0YXJ0dXAuYWRkTGlzdGVuZXIoYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IGFjdGl2ZVByb3h5SWQgPSBhd2FpdCBnZXRBY3RpdmVQcm94eSgpXG4gICAgaWYgKGFjdGl2ZVByb3h5SWQpIHtcbiAgICAgIGNvbnN0IHByb3hpZXMgPSBhd2FpdCBnZXRQcm94aWVzKClcbiAgICAgIGNvbnN0IGFjdGl2ZVByb3h5ID0gcHJveGllcy5maW5kKHAgPT4gcC5pZCA9PT0gYWN0aXZlUHJveHlJZClcbiAgICAgIGlmIChhY3RpdmVQcm94eSkge1xuICAgICAgICBhd2FpdCBhcHBseVByb3h5KGFjdGl2ZVByb3h5KVxuICAgICAgICBzZXRCYWRnZShhY3RpdmVQcm94eS5uYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXdhaXQgc2F2ZUFjdGl2ZVByb3h5KG51bGwpXG4gICAgICAgIGNsZWFyQmFkZ2UoKVxuICAgICAgfVxuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gcmVzdG9yZSBwcm94eSBvbiBzdGFydHVwOicsIGVycm9yKVxuICB9XG59KVxuXG4vLyDnm5HlkKzmnaXoh6pwb3B1cOeahOa2iOaBr1xuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKChcbiAgbWVzc2FnZTogTWVzc2FnZSxcbiAgc2VuZGVyLFxuICBzZW5kUmVzcG9uc2U6IChyZXNwb25zZTogTWVzc2FnZVJlc3BvbnNlKSA9PiB2b2lkXG4pID0+IHtcbiAgaGFuZGxlTWVzc2FnZShtZXNzYWdlKS50aGVuKHNlbmRSZXNwb25zZSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgIHNlbmRSZXNwb25zZSh7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogZXJyb3IubWVzc2FnZSB9KVxuICB9KVxuICByZXR1cm4gdHJ1ZSAvLyDkv53mjIHmtojmga/pgJrpgZPlvIDmlL5cbn0pXG5cbi8vIOWkhOeQhua2iOaBr1xuYXN5bmMgZnVuY3Rpb24gaGFuZGxlTWVzc2FnZShtZXNzYWdlOiBNZXNzYWdlKTogUHJvbWlzZTxNZXNzYWdlUmVzcG9uc2U+IHtcbiAgc3dpdGNoIChtZXNzYWdlLnR5cGUpIHtcbiAgICBjYXNlICdHRVRfUFJPWElFUyc6XG4gICAgICBjb25zdCBwcm94aWVzID0gYXdhaXQgZ2V0UHJveGllcygpXG4gICAgICBjb25zdCBhY3RpdmVQcm94eUlkID0gYXdhaXQgZ2V0QWN0aXZlUHJveHkoKVxuICAgICAgY29uc3QgcHJveGllc1dpdGhTdGF0dXMgPSBwcm94aWVzLm1hcChwcm94eSA9PiAoe1xuICAgICAgICAuLi5wcm94eSxcbiAgICAgICAgaXNBY3RpdmU6IHByb3h5LmlkID09PSBhY3RpdmVQcm94eUlkXG4gICAgICB9KSlcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHByb3hpZXNXaXRoU3RhdHVzIH1cblxuICAgIGNhc2UgJ0FERF9QUk9YWSc6XG4gICAgICByZXR1cm4gYXdhaXQgYWRkUHJveHkobWVzc2FnZS5kYXRhKVxuXG4gICAgY2FzZSAnVVBEQVRFX1BST1hZJzpcbiAgICAgIHJldHVybiBhd2FpdCB1cGRhdGVQcm94eShtZXNzYWdlLmRhdGEpXG5cbiAgICBjYXNlICdERUxFVEVfUFJPWFknOlxuICAgICAgcmV0dXJuIGF3YWl0IGRlbGV0ZVByb3h5KG1lc3NhZ2UuZGF0YS5pZClcblxuICAgIGNhc2UgJ0FDVElWQVRFX1BST1hZJzpcbiAgICAgIHJldHVybiBhd2FpdCBhY3RpdmF0ZVByb3h5KG1lc3NhZ2UuZGF0YS5pZClcblxuICAgIGNhc2UgJ0RJU0NPTk5FQ1RfUFJPWFknOlxuICAgICAgcmV0dXJuIGF3YWl0IGRpc2Nvbm5lY3RQcm94eSgpXG5cbiAgICBjYXNlICdHRVRfU1RBVFVTJzpcbiAgICAgIHJldHVybiBhd2FpdCBnZXRQcm94eVN0YXR1cygpXG5cbiAgICBjYXNlICdJTVBPUlRfUFJPWElFUyc6XG4gICAgICByZXR1cm4gYXdhaXQgaW1wb3J0UHJveGllcyhtZXNzYWdlLmRhdGEpXG5cbiAgICBjYXNlICdFWFBPUlRfUFJPWElFUyc6XG4gICAgICByZXR1cm4gYXdhaXQgZXhwb3J0UHJveGllcygpXG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnVW5rbm93biBtZXNzYWdlIHR5cGUnIH1cbiAgfVxufVxuXG4vLyDmt7vliqDku6PnkIZcbmFzeW5jIGZ1bmN0aW9uIGFkZFByb3h5KHByb3h5RGF0YTogT21pdDxQcm94eUNvbmZpZywgJ2lkJz4pOiBQcm9taXNlPE1lc3NhZ2VSZXNwb25zZT4ge1xuICB0cnkge1xuICAgIGNvbnN0IG5ld1Byb3h5ID0gYXdhaXQgYWRkUHJveHlUb1N0b3JhZ2UocHJveHlEYXRhKVxuICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IG5ld1Byb3h5IH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfVxuICB9XG59XG5cbi8vIOabtOaWsOS7o+eQhlxuYXN5bmMgZnVuY3Rpb24gdXBkYXRlUHJveHkocHJveHlEYXRhOiBQcm94eUNvbmZpZyk6IFByb21pc2U8TWVzc2FnZVJlc3BvbnNlPiB7XG4gIHRyeSB7XG4gICAgYXdhaXQgdXBkYXRlUHJveHlJblN0b3JhZ2UocHJveHlEYXRhKVxuICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogZXJyb3IubWVzc2FnZSB9XG4gIH1cbn1cblxuLy8g5Yig6Zmk5Luj55CGXG5hc3luYyBmdW5jdGlvbiBkZWxldGVQcm94eShwcm94eUlkOiBzdHJpbmcpOiBQcm9taXNlPE1lc3NhZ2VSZXNwb25zZT4ge1xuICB0cnkge1xuICAgIC8vIOWmguaenOimgeWIoOmZpOeahOS7o+eQhuato+WcqOS9v+eUqO+8jOWFiOaWreW8gOi/nuaOpVxuICAgIGNvbnN0IGFjdGl2ZVByb3h5SWQgPSBhd2FpdCBnZXRBY3RpdmVQcm94eSgpXG4gICAgaWYgKGFjdGl2ZVByb3h5SWQgPT09IHByb3h5SWQpIHtcbiAgICAgIGF3YWl0IGRpc2Nvbm5lY3RQcm94eSgpXG4gICAgfVxuICAgIFxuICAgIGF3YWl0IGRlbGV0ZVByb3h5RnJvbVN0b3JhZ2UocHJveHlJZClcbiAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfVxuICB9XG59XG5cbi8vIOa/gOa0u+S7o+eQhlxuYXN5bmMgZnVuY3Rpb24gYWN0aXZhdGVQcm94eShwcm94eUlkOiBzdHJpbmcpOiBQcm9taXNlPE1lc3NhZ2VSZXNwb25zZT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHByb3hpZXMgPSBhd2FpdCBnZXRQcm94aWVzKClcbiAgICBjb25zdCBwcm94eSA9IHByb3hpZXMuZmluZChwID0+IHAuaWQgPT09IHByb3h5SWQpXG4gICAgaWYgKCFwcm94eSkge1xuICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAn5Luj55CG5LiN5a2Y5ZyoJyB9XG4gICAgfVxuICAgIFxuICAgIC8vIOiuvue9ruiupOivgeS/oeaBr1xuICAgIGlmIChwcm94eS51c2VybmFtZSAmJiBwcm94eS5wYXNzd29yZCkge1xuICAgICAgY3VycmVudEF1dGggPSB7XG4gICAgICAgIHVzZXJuYW1lOiBwcm94eS51c2VybmFtZSxcbiAgICAgICAgcGFzc3dvcmQ6IHByb3h5LnBhc3N3b3JkXG4gICAgICB9XG4gICAgICBzZXR1cEF1dGhMaXN0ZW5lcigpXG4gICAgfSBlbHNlIHtcbiAgICAgIGN1cnJlbnRBdXRoID0gbnVsbFxuICAgICAgcmVtb3ZlQXV0aExpc3RlbmVyKClcbiAgICB9XG4gICAgXG4gICAgYXdhaXQgYXBwbHlQcm94eShwcm94eSlcbiAgICBhd2FpdCBzYXZlQWN0aXZlUHJveHkocHJveHlJZClcbiAgICBzZXRCYWRnZShwcm94eS5uYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpKVxuICAgIFxuICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHByb3h5IH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IChlcnJvciBhcyBFcnJvcikubWVzc2FnZSB9XG4gIH1cbn1cblxuLy8g5pat5byA5Luj55CGXG5hc3luYyBmdW5jdGlvbiBkaXNjb25uZWN0UHJveHkoKTogUHJvbWlzZTxNZXNzYWdlUmVzcG9uc2U+IHtcbiAgdHJ5IHtcbiAgICBhd2FpdCBkaXNhYmxlUHJveHkoKVxuICAgIGF3YWl0IHNhdmVBY3RpdmVQcm94eShudWxsKVxuICAgIGN1cnJlbnRBdXRoID0gbnVsbFxuICAgIHJlbW92ZUF1dGhMaXN0ZW5lcigpXG4gICAgY2xlYXJCYWRnZSgpXG4gICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAoZXJyb3IgYXMgRXJyb3IpLm1lc3NhZ2UgfVxuICB9XG59XG5cbi8vIOiOt+WPluS7o+eQhueKtuaAgVxuYXN5bmMgZnVuY3Rpb24gZ2V0UHJveHlTdGF0dXMoKTogUHJvbWlzZTxNZXNzYWdlUmVzcG9uc2U+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBhY3RpdmVQcm94eUlkID0gYXdhaXQgZ2V0QWN0aXZlUHJveHkoKVxuICAgIGxldCBhY3RpdmVQcm94eSA9IG51bGxcbiAgICBcbiAgICBpZiAoYWN0aXZlUHJveHlJZCkge1xuICAgICAgY29uc3QgcHJveGllcyA9IGF3YWl0IGdldFByb3hpZXMoKVxuICAgICAgYWN0aXZlUHJveHkgPSBwcm94aWVzLmZpbmQocCA9PiBwLmlkID09PSBhY3RpdmVQcm94eUlkKSB8fCBudWxsXG4gICAgfVxuICAgIFxuICAgIHJldHVybiB7XG4gICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgZGF0YToge1xuICAgICAgICBpc0VuYWJsZWQ6ICEhYWN0aXZlUHJveHksXG4gICAgICAgIGN1cnJlbnRQcm94eTogYWN0aXZlUHJveHksXG4gICAgICAgIGNvbm5lY3Rpb25TdGF0dXM6IGFjdGl2ZVByb3h5ID8gJ2Nvbm5lY3RlZCcgOiAnZGlzY29ubmVjdGVkJ1xuICAgICAgfVxuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IChlcnJvciBhcyBFcnJvcikubWVzc2FnZSB9XG4gIH1cbn1cblxuLy8g5a+85YWl5Luj55CGXG5hc3luYyBmdW5jdGlvbiBpbXBvcnRQcm94aWVzKG5ld1Byb3hpZXM6IFByb3h5Q29uZmlnW10pOiBQcm9taXNlPE1lc3NhZ2VSZXNwb25zZT4ge1xuICB0cnkge1xuICAgIGNvbnN0IGV4aXN0aW5nUHJveGllcyA9IGF3YWl0IGdldFByb3hpZXMoKVxuICAgIGNvbnN0IGFsbFByb3hpZXMgPSBbLi4uZXhpc3RpbmdQcm94aWVzLCAuLi5uZXdQcm94aWVzXVxuICAgIGF3YWl0IHNhdmVQcm94aWVzKGFsbFByb3hpZXMpXG4gICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogYWxsUHJveGllcyB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAoZXJyb3IgYXMgRXJyb3IpLm1lc3NhZ2UgfVxuICB9XG59XG5cbi8vIOWvvOWHuuS7o+eQhlxuYXN5bmMgZnVuY3Rpb24gZXhwb3J0UHJveGllcygpOiBQcm9taXNlPE1lc3NhZ2VSZXNwb25zZT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHByb3hpZXMgPSBhd2FpdCBnZXRQcm94aWVzKClcbiAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBwcm94aWVzIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IChlcnJvciBhcyBFcnJvcikubWVzc2FnZSB9XG4gIH1cbn1cblxuLy8g6K6+572u6K6k6K+B55uR5ZCs5ZmoXG5mdW5jdGlvbiBzZXR1cEF1dGhMaXN0ZW5lcigpIHtcbiAgaWYgKGNocm9tZS53ZWJSZXF1ZXN0ICYmIGNocm9tZS53ZWJSZXF1ZXN0Lm9uQXV0aFJlcXVpcmVkKSB7XG4gICAgY2hyb21lLndlYlJlcXVlc3Qub25BdXRoUmVxdWlyZWQucmVtb3ZlTGlzdGVuZXIoaGFuZGxlQXV0aFJlcXVlc3QpXG4gICAgY2hyb21lLndlYlJlcXVlc3Qub25BdXRoUmVxdWlyZWQuYWRkTGlzdGVuZXIoXG4gICAgICBoYW5kbGVBdXRoUmVxdWVzdCxcbiAgICAgIHsgdXJsczogWyc8YWxsX3VybHM+J10gfSxcbiAgICAgIFsnYXN5bmNCbG9ja2luZyddXG4gICAgKVxuICB9XG59XG5cbi8vIOenu+mZpOiupOivgeebkeWQrOWZqFxuZnVuY3Rpb24gcmVtb3ZlQXV0aExpc3RlbmVyKCkge1xuICBpZiAoY2hyb21lLndlYlJlcXVlc3QgJiYgY2hyb21lLndlYlJlcXVlc3Qub25BdXRoUmVxdWlyZWQpIHtcbiAgICBjaHJvbWUud2ViUmVxdWVzdC5vbkF1dGhSZXF1aXJlZC5yZW1vdmVMaXN0ZW5lcihoYW5kbGVBdXRoUmVxdWVzdClcbiAgfVxufVxuXG4vLyDlpITnkIborqTor4Hor7fmsYJcbmZ1bmN0aW9uIGhhbmRsZUF1dGhSZXF1ZXN0KFxuICBkZXRhaWxzOiBjaHJvbWUud2ViUmVxdWVzdC5XZWJBdXRoZW50aWNhdGlvbkNoYWxsZW5nZURldGFpbHNcbik6IGNocm9tZS53ZWJSZXF1ZXN0LkF1dGhDcmVkZW50aWFscyB8IHVuZGVmaW5lZCB7XG4gIGlmIChjdXJyZW50QXV0aCAmJiBkZXRhaWxzLmlzUHJveHkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXNlcm5hbWU6IGN1cnJlbnRBdXRoLnVzZXJuYW1lLFxuICAgICAgcGFzc3dvcmQ6IGN1cnJlbnRBdXRoLnBhc3N3b3JkXG4gICAgfVxuICB9XG4gIHJldHVybiB1bmRlZmluZWRcbn1cbiIsImltcG9ydCB0eXBlIHsgUHJveHlDb25maWcsIEV4dGVuc2lvblNldHRpbmdzIH0gZnJvbSAnLi90eXBlcydcbmltcG9ydCB7IGRldGVjdExvY2F0aW9uT25saW5lLCBhZGRMb2NhdGlvblVwZGF0ZUxpc3RlbmVyIH0gZnJvbSAnLi9sb2NhdGlvbidcblxuLy8g5a2Y5YKo6ZSu5ZCN5bi46YePXG5leHBvcnQgY29uc3QgU1RPUkFHRV9LRVlTID0ge1xuICBQUk9YSUVTOiAncHJveGllcycsXG4gIFNFVFRJTkdTOiAnc2V0dGluZ3MnLFxuICBBQ1RJVkVfUFJPWFk6ICdhY3RpdmVQcm94eScsXG4gIFBST1hZX1NUQVRVUzogJ3Byb3h5U3RhdHVzJ1xufSBhcyBjb25zdFxuXG4vLyDojrflj5bku6PnkIbliJfooahcbmV4cG9ydCBjb25zdCBnZXRQcm94aWVzID0gYXN5bmMgKCk6IFByb21pc2U8UHJveHlDb25maWdbXT4gPT4ge1xuICBjb25zdCByZXN1bHQgPSBhd2FpdCBjaHJvbWUuc3RvcmFnZS5zeW5jLmdldChTVE9SQUdFX0tFWVMuUFJPWElFUylcbiAgcmV0dXJuIHJlc3VsdFtTVE9SQUdFX0tFWVMuUFJPWElFU10gfHwgW11cbn1cblxuLy8g5L+d5a2Y5Luj55CG5YiX6KGoXG5leHBvcnQgY29uc3Qgc2F2ZVByb3hpZXMgPSBhc3luYyAocHJveGllczogUHJveHlDb25maWdbXSk6IFByb21pc2U8dm9pZD4gPT4ge1xuICBhd2FpdCBjaHJvbWUuc3RvcmFnZS5zeW5jLnNldCh7IFtTVE9SQUdFX0tFWVMuUFJPWElFU106IHByb3hpZXMgfSlcbn1cblxuLy8g6I635Y+W6K6+572uXG5leHBvcnQgY29uc3QgZ2V0U2V0dGluZ3MgPSBhc3luYyAoKTogUHJvbWlzZTxFeHRlbnNpb25TZXR0aW5ncz4gPT4ge1xuICBjb25zdCByZXN1bHQgPSBhd2FpdCBjaHJvbWUuc3RvcmFnZS5zeW5jLmdldChTVE9SQUdFX0tFWVMuU0VUVElOR1MpXG4gIGNvbnN0IGRlZmF1bHRTZXR0aW5nczogRXh0ZW5zaW9uU2V0dGluZ3MgPSB7XG4gICAgYXV0b0Nvbm5lY3Q6IGZhbHNlLFxuICAgIHNob3dOb3RpZmljYXRpb25zOiB0cnVlLFxuICAgIHRoZW1lOiAnYXV0bydcbiAgfVxuICByZXR1cm4geyAuLi5kZWZhdWx0U2V0dGluZ3MsIC4uLnJlc3VsdFtTVE9SQUdFX0tFWVMuU0VUVElOR1NdIH1cbn1cblxuLy8g5L+d5a2Y6K6+572uXG5leHBvcnQgY29uc3Qgc2F2ZVNldHRpbmdzID0gYXN5bmMgKHNldHRpbmdzOiBFeHRlbnNpb25TZXR0aW5ncyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICBhd2FpdCBjaHJvbWUuc3RvcmFnZS5zeW5jLnNldCh7IFtTVE9SQUdFX0tFWVMuU0VUVElOR1NdOiBzZXR0aW5ncyB9KVxufVxuXG4vLyDojrflj5blvZPliY3mv4DmtLvnmoTku6PnkIZcbmV4cG9ydCBjb25zdCBnZXRBY3RpdmVQcm94eSA9IGFzeW5jICgpOiBQcm9taXNlPHN0cmluZyB8IG51bGw+ID0+IHtcbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KFNUT1JBR0VfS0VZUy5BQ1RJVkVfUFJPWFkpXG4gIHJldHVybiByZXN1bHRbU1RPUkFHRV9LRVlTLkFDVElWRV9QUk9YWV0gfHwgbnVsbFxufVxuXG4vLyDkv53lrZjlvZPliY3mv4DmtLvnmoTku6PnkIZJRFxuZXhwb3J0IGNvbnN0IHNhdmVBY3RpdmVQcm94eSA9IGFzeW5jIChwcm94eUlkOiBzdHJpbmcgfCBudWxsKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gIGlmIChwcm94eUlkKSB7XG4gICAgYXdhaXQgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHsgW1NUT1JBR0VfS0VZUy5BQ1RJVkVfUFJPWFldOiBwcm94eUlkIH0pXG4gIH0gZWxzZSB7XG4gICAgYXdhaXQgY2hyb21lLnN0b3JhZ2UubG9jYWwucmVtb3ZlKFNUT1JBR0VfS0VZUy5BQ1RJVkVfUFJPWFkpXG4gIH1cbn1cblxuLy8g55Sf5oiQ5ZSv5LiASURcbmV4cG9ydCBjb25zdCBnZW5lcmF0ZUlkID0gKCk6IHN0cmluZyA9PiB7XG4gIHJldHVybiBEYXRlLm5vdygpLnRvU3RyaW5nKDM2KSArIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cigyKVxufVxuXG4vLyDmt7vliqDku6PnkIZcbmV4cG9ydCBjb25zdCBhZGRQcm94eSA9IGFzeW5jIChwcm94eTogT21pdDxQcm94eUNvbmZpZywgJ2lkJz4pOiBQcm9taXNlPFByb3h5Q29uZmlnPiA9PiB7XG4gIGNvbnN0IHByb3hpZXMgPSBhd2FpdCBnZXRQcm94aWVzKClcbiAgXG4gIGNvbnN0IG5ld1Byb3h5OiBQcm94eUNvbmZpZyA9IHtcbiAgICAuLi5wcm94eSxcbiAgICBpZDogZ2VuZXJhdGVJZCgpLFxuICB9XG4gIFxuICAvLyDlhYjkv53lrZjln7rmnKzkv6Hmga9cbiAgcHJveGllcy5wdXNoKG5ld1Byb3h5KVxuICBhd2FpdCBzYXZlUHJveGllcyhwcm94aWVzKVxuICBcbiAgLy8g5byC5q2l5qOA5rWL5b2S5bGe5Zyw77yI5LiN6Zi75aGe5L+d5a2Y5pON5L2c77yJXG4gIGlmICghbmV3UHJveHkubG9jYXRpb24gJiYgbmV3UHJveHkuaG9zdCkge1xuICAgIGRldGVjdExvY2F0aW9uT25saW5lKG5ld1Byb3h5Lmhvc3QpLnRoZW4oYXN5bmMgbG9jYXRpb25JbmZvID0+IHtcbiAgICAgIC8vIOabtOaWsOS7o+eQhueahOW9kuWxnuWcsOS/oeaBr1xuICAgICAgY29uc3QgdXBkYXRlZFByb3hpZXMgPSBhd2FpdCBnZXRQcm94aWVzKClcbiAgICAgIGNvbnN0IGluZGV4ID0gdXBkYXRlZFByb3hpZXMuZmluZEluZGV4KHAgPT4gcC5pZCA9PT0gbmV3UHJveHkuaWQpXG4gICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgIHVwZGF0ZWRQcm94aWVzW2luZGV4XS5sb2NhdGlvbiA9IGxvY2F0aW9uSW5mby5sb2NhdGlvblxuICAgICAgICB1cGRhdGVkUHJveGllc1tpbmRleF0uY291bnRyeUNvZGUgPSBsb2NhdGlvbkluZm8uY291bnRyeUNvZGVcbiAgICAgICAgYXdhaXQgc2F2ZVByb3hpZXModXBkYXRlZFByb3hpZXMpXG4gICAgICAgIFxuICAgICAgICAvLyDlj5HpgIHmtojmga/pgJrnn6ViYWNrZ3JvdW5k5ZKMcG9wdXDmm7TmlrBcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7XG4gICAgICAgICAgICB0eXBlOiAnUFJPWFlfTE9DQVRJT05fVVBEQVRFRCcsXG4gICAgICAgICAgICBkYXRhOiB7IFxuICAgICAgICAgICAgICBwcm94eUlkOiBuZXdQcm94eS5pZCwgXG4gICAgICAgICAgICAgIGhvc3Q6IG5ld1Byb3h5Lmhvc3QsXG4gICAgICAgICAgICAgIGxvY2F0aW9uOiBsb2NhdGlvbkluZm8ubG9jYXRpb24sXG4gICAgICAgICAgICAgIGNvdW50cnlDb2RlOiBsb2NhdGlvbkluZm8uY291bnRyeUNvZGUgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAvLyDlv73nlaXmtojmga/lj5HpgIHplJnor6/vvIjlj6/og73msqHmnInmtLvot4PnmoTmjqXmlLbogIXvvIlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pLmNhdGNoKGNvbnNvbGUuZXJyb3IpXG4gIH1cbiAgXG4gIHJldHVybiBuZXdQcm94eVxufVxuXG4vLyDmm7TmlrDku6PnkIZcbmV4cG9ydCBjb25zdCB1cGRhdGVQcm94eSA9IGFzeW5jICh1cGRhdGVkUHJveHk6IFByb3h5Q29uZmlnKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gIGNvbnN0IHByb3hpZXMgPSBhd2FpdCBnZXRQcm94aWVzKClcbiAgY29uc3QgaW5kZXggPSBwcm94aWVzLmZpbmRJbmRleChwID0+IHAuaWQgPT09IHVwZGF0ZWRQcm94eS5pZClcbiAgXG4gIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICBjb25zdCBvbGRIb3N0ID0gcHJveGllc1tpbmRleF0uaG9zdFxuICAgIFxuICAgIC8vIOWFiOabtOaWsOWfuuacrOS/oeaBr1xuICAgIHByb3hpZXNbaW5kZXhdID0gdXBkYXRlZFByb3h5XG4gICAgYXdhaXQgc2F2ZVByb3hpZXMocHJveGllcylcbiAgICBcbiAgICAvLyDlpoLmnpzkuLvmnLrlnLDlnYDmlLnlj5jkuJTmsqHmnInlvZLlsZ7lnLDkv6Hmga/vvIzlvILmraXmo4DmtYtcbiAgICBpZiAob2xkSG9zdCAhPT0gdXBkYXRlZFByb3h5Lmhvc3QgJiYgIXVwZGF0ZWRQcm94eS5sb2NhdGlvbikge1xuICAgICAgZGV0ZWN0TG9jYXRpb25PbmxpbmUodXBkYXRlZFByb3h5Lmhvc3QpLnRoZW4oYXN5bmMgbG9jYXRpb25JbmZvID0+IHtcbiAgICAgICAgY29uc3QgY3VycmVudFByb3hpZXMgPSBhd2FpdCBnZXRQcm94aWVzKClcbiAgICAgICAgY29uc3QgY3VycmVudEluZGV4ID0gY3VycmVudFByb3hpZXMuZmluZEluZGV4KHAgPT4gcC5pZCA9PT0gdXBkYXRlZFByb3h5LmlkKVxuICAgICAgICBpZiAoY3VycmVudEluZGV4ICE9PSAtMSkge1xuICAgICAgICAgIGN1cnJlbnRQcm94aWVzW2N1cnJlbnRJbmRleF0ubG9jYXRpb24gPSBsb2NhdGlvbkluZm8ubG9jYXRpb25cbiAgICAgICAgICBjdXJyZW50UHJveGllc1tjdXJyZW50SW5kZXhdLmNvdW50cnlDb2RlID0gbG9jYXRpb25JbmZvLmNvdW50cnlDb2RlXG4gICAgICAgICAgYXdhaXQgc2F2ZVByb3hpZXMoY3VycmVudFByb3hpZXMpXG4gICAgICAgICAgXG4gICAgICAgICAgLy8g5Y+R6YCB5raI5oGv6YCa55+l5pu05pawXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHtcbiAgICAgICAgICAgICAgdHlwZTogJ1BST1hZX0xPQ0FUSU9OX1VQREFURUQnLFxuICAgICAgICAgICAgICBkYXRhOiB7IFxuICAgICAgICAgICAgICAgIHByb3h5SWQ6IHVwZGF0ZWRQcm94eS5pZCwgXG4gICAgICAgICAgICAgICAgaG9zdDogdXBkYXRlZFByb3h5Lmhvc3QsXG4gICAgICAgICAgICAgICAgbG9jYXRpb246IGxvY2F0aW9uSW5mby5sb2NhdGlvbixcbiAgICAgICAgICAgICAgICBjb3VudHJ5Q29kZTogbG9jYXRpb25JbmZvLmNvdW50cnlDb2RlIFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAvLyDlv73nlaXmtojmga/lj5HpgIHplJnor69cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pLmNhdGNoKGNvbnNvbGUuZXJyb3IpXG4gICAgfVxuICB9XG59XG5cbi8vIOWIoOmZpOS7o+eQhlxuZXhwb3J0IGNvbnN0IGRlbGV0ZVByb3h5ID0gYXN5bmMgKHByb3h5SWQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICBjb25zdCBwcm94aWVzID0gYXdhaXQgZ2V0UHJveGllcygpXG4gIGNvbnN0IGZpbHRlcmVkUHJveGllcyA9IHByb3hpZXMuZmlsdGVyKHAgPT4gcC5pZCAhPT0gcHJveHlJZClcbiAgYXdhaXQgc2F2ZVByb3hpZXMoZmlsdGVyZWRQcm94aWVzKVxufVxuXG4vLyDpqozor4Hku6PnkIbphY3nva5cbmV4cG9ydCBjb25zdCB2YWxpZGF0ZVByb3h5Q29uZmlnID0gKGNvbmZpZzogUGFydGlhbDxQcm94eUNvbmZpZz4pOiBzdHJpbmdbXSA9PiB7XG4gIGNvbnN0IGVycm9yczogc3RyaW5nW10gPSBbXVxuICBcbiAgaWYgKCFjb25maWcubmFtZT8udHJpbSgpKSB7XG4gICAgZXJyb3JzLnB1c2goJ+S7o+eQhuWQjeensOS4jeiDveS4uuepuicpXG4gIH1cbiAgXG4gIGlmICghY29uZmlnLmhvc3Q/LnRyaW0oKSkge1xuICAgIGVycm9ycy5wdXNoKCfmnI3liqHlmajlnLDlnYDkuI3og73kuLrnqbonKVxuICB9XG4gIFxuICBpZiAoIWNvbmZpZy5wb3J0IHx8IGNvbmZpZy5wb3J0IDwgMSB8fCBjb25maWcucG9ydCA+IDY1NTM1KSB7XG4gICAgZXJyb3JzLnB1c2goJ+err+WPo+WPt+W/hemhu+WcqDEtNjU1MzXkuYvpl7QnKVxuICB9XG4gIFxuICBpZiAoIWNvbmZpZy50eXBlIHx8ICFbJ2h0dHAnLCAnaHR0cHMnLCAnc29ja3M0JywgJ3NvY2tzNSddLmluY2x1ZGVzKGNvbmZpZy50eXBlKSkge1xuICAgIGVycm9ycy5wdXNoKCfku6PnkIbnsbvlnovml6DmlYgnKVxuICB9XG4gIFxuICByZXR1cm4gZXJyb3JzXG59XG4iLCIvLyBJUOWcsOWdgOW9kuWxnuWcsOajgOa1i+W3peWFtyAtIOS9v+eUqOWcqOe6v0FQSVxuaW50ZXJmYWNlIExvY2F0aW9uSW5mbyB7XG4gIGxvY2F0aW9uOiBzdHJpbmdcbiAgY291bnRyeUNvZGU6IHN0cmluZ1xuICBmbGFnOiBzdHJpbmdcbiAgY2l0eT86IHN0cmluZ1xuICByZWdpb24/OiBzdHJpbmdcbiAgaXNwPzogc3RyaW5nXG59XG5cbi8vIOS9jee9ruabtOaWsOS6i+S7tuexu+Wei1xudHlwZSBMb2NhdGlvblVwZGF0ZUxpc3RlbmVyID0gKGhvc3Q6IHN0cmluZywgbG9jYXRpb25JbmZvOiBMb2NhdGlvbkluZm8pID0+IHZvaWRcblxuLy8g55uR5ZCs5Zmo566h55CGXG5jb25zdCBsb2NhdGlvblVwZGF0ZUxpc3RlbmVycyA9IG5ldyBTZXQ8TG9jYXRpb25VcGRhdGVMaXN0ZW5lcj4oKVxuXG4vLyDmt7vliqDkvY3nva7mm7TmlrDnm5HlkKzlmahcbmV4cG9ydCBmdW5jdGlvbiBhZGRMb2NhdGlvblVwZGF0ZUxpc3RlbmVyKGxpc3RlbmVyOiBMb2NhdGlvblVwZGF0ZUxpc3RlbmVyKTogKCkgPT4gdm9pZCB7XG4gIGxvY2F0aW9uVXBkYXRlTGlzdGVuZXJzLmFkZChsaXN0ZW5lcilcbiAgLy8g6L+U5Zue56e76Zmk55uR5ZCs5Zmo55qE5Ye95pWwXG4gIHJldHVybiAoKSA9PiBsb2NhdGlvblVwZGF0ZUxpc3RlbmVycy5kZWxldGUobGlzdGVuZXIpXG59XG5cbi8vIOinpuWPkeS9jee9ruabtOaWsOS6i+S7tlxuZnVuY3Rpb24gbm90aWZ5TG9jYXRpb25VcGRhdGUoaG9zdDogc3RyaW5nLCBsb2NhdGlvbkluZm86IExvY2F0aW9uSW5mbyk6IHZvaWQge1xuICBsb2NhdGlvblVwZGF0ZUxpc3RlbmVycy5mb3JFYWNoKGxpc3RlbmVyID0+IHtcbiAgICB0cnkge1xuICAgICAgbGlzdGVuZXIoaG9zdCwgbG9jYXRpb25JbmZvKVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdMb2NhdGlvbiB1cGRhdGUgbGlzdGVuZXIgZXJyb3I6JywgZXJyb3IpXG4gICAgfVxuICB9KVxufVxuXG4vLyDlm73lrrbku6PnoIHliLDlm73ml5fnmoTmmKDlsIRcbmNvbnN0IGNvdW50cnlGbGFnczogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcbiAgJ0NOJzogJ/Cfh6jwn4ezJywgJ1VTJzogJ/Cfh7rwn4e4JywgJ0pQJzogJ/Cfh6/wn4e1JywgJ0tSJzogJ/Cfh7Dwn4e3JywgJ1NHJzogJ/Cfh7jwn4esJyxcbiAgJ0hLJzogJ/Cfh63wn4ewJywgJ1RXJzogJ/Cfh7nwn4e8JywgJ0dCJzogJ/Cfh6zwn4enJywgJ1VLJzogJ/Cfh6zwn4enJywgJ0RFJzogJ/Cfh6nwn4eqJyxcbiAgJ0ZSJzogJ/Cfh6vwn4e3JywgJ05MJzogJ/Cfh7Pwn4exJywgJ1JVJzogJ/Cfh7fwn4e6JywgJ0NBJzogJ/Cfh6jwn4emJywgJ0FVJzogJ/Cfh6bwn4e6JyxcbiAgJ0JSJzogJ/Cfh6fwn4e3JywgJ0lOJzogJ/Cfh67wn4ezJywgJ0lUJzogJ/Cfh67wn4e5JywgJ0VTJzogJ/Cfh6rwn4e4JywgJ1NFJzogJ/Cfh7jwn4eqJyxcbiAgJ05PJzogJ/Cfh7Pwn4e0JywgJ0ZJJzogJ/Cfh6vwn4euJywgJ0RLJzogJ/Cfh6nwn4ewJywgJ0NIJzogJ/Cfh6jwn4etJywgJ0FUJzogJ/Cfh6bwn4e5JyxcbiAgJ0JFJzogJ/Cfh6fwn4eqJywgJ0lFJzogJ/Cfh67wn4eqJywgJ1BUJzogJ/Cfh7Xwn4e5JywgJ0dSJzogJ/Cfh6zwn4e3JywgJ1BMJzogJ/Cfh7Xwn4exJyxcbiAgJ0NaJzogJ/Cfh6jwn4e/JywgJ0hVJzogJ/Cfh63wn4e6JywgJ1NLJzogJ/Cfh7jwn4ewJywgJ1NJJzogJ/Cfh7jwn4euJywgJ0hSJzogJ/Cfh63wn4e3JyxcbiAgJ0JHJzogJ/Cfh6fwn4esJywgJ1JPJzogJ/Cfh7fwn4e0JywgJ0xUJzogJ/Cfh7Hwn4e5JywgJ0xWJzogJ/Cfh7Hwn4e7JywgJ0VFJzogJ/Cfh6rwn4eqJyxcbiAgJ1VBJzogJ/Cfh7rwn4emJywgJ0JZJzogJ/Cfh6fwn4e+JywgJ01EJzogJ/Cfh7Lwn4epJywgJ0dFJzogJ/Cfh6zwn4eqJywgJ0FNJzogJ/Cfh6bwn4eyJyxcbiAgJ0FaJzogJ/Cfh6bwn4e/JywgJ0taJzogJ/Cfh7Dwn4e/JywgJ1VaJzogJ/Cfh7rwn4e/JywgJ0tHJzogJ/Cfh7Dwn4esJywgJ1RKJzogJ/Cfh7nwn4evJyxcbiAgJ1RNJzogJ/Cfh7nwn4eyJywgJ01OJzogJ/Cfh7Lwn4ezJywgJ01NJzogJ/Cfh7Lwn4eyJywgJ0xBJzogJ/Cfh7Hwn4emJywgJ0tIJzogJ/Cfh7Dwn4etJyxcbiAgJ1ZOJzogJ/Cfh7vwn4ezJywgJ1RIJzogJ/Cfh7nwn4etJywgJ01ZJzogJ/Cfh7Lwn4e+JywgJ0lEJzogJ/Cfh67wn4epJywgJ1BIJzogJ/Cfh7Xwn4etJyxcbiAgJ0JEJzogJ/Cfh6fwn4epJywgJ1BLJzogJ/Cfh7Xwn4ewJywgJ0xLJzogJ/Cfh7Hwn4ewJywgJ05QJzogJ/Cfh7Pwn4e1JywgJ0FGJzogJ/Cfh6bwn4erJyxcbiAgJ0lSJzogJ/Cfh67wn4e3JywgJ0lRJzogJ/Cfh67wn4e2JywgJ1NZJzogJ/Cfh7jwn4e+JywgJ0xCJzogJ/Cfh7Hwn4enJywgJ0pPJzogJ/Cfh6/wn4e0JyxcbiAgJ1BTJzogJ/Cfh7Xwn4e4JywgJ0lMJzogJ/Cfh67wn4exJywgJ1NBJzogJ/Cfh7jwn4emJywgJ0FFJzogJ/Cfh6bwn4eqJywgJ1FBJzogJ/Cfh7bwn4emJyxcbiAgJ0tXJzogJ/Cfh7Dwn4e8JywgJ0JIJzogJ/Cfh6fwn4etJywgJ09NJzogJ/Cfh7Twn4eyJywgJ1lFJzogJ/Cfh77wn4eqJywgJ0VHJzogJ/Cfh6rwn4esJyxcbiAgJ0xZJzogJ/Cfh7Hwn4e+JywgJ1ROJzogJ/Cfh7nwn4ezJywgJ0RaJzogJ/Cfh6nwn4e/JywgJ01BJzogJ/Cfh7Lwn4emJywgJ1pBJzogJ/Cfh7/wn4emJyxcbiAgJ05HJzogJ/Cfh7Pwn4esJywgJ0tFJzogJ/Cfh7Dwn4eqJywgJ0VUJzogJ/Cfh6rwn4e5JywgJ0dIJzogJ/Cfh6zwn4etJywgJ1VHJzogJ/Cfh7rwn4esJyxcbiAgJ1RaJzogJ/Cfh7nwn4e/JywgJ01aJzogJ/Cfh7Lwn4e/JywgJ1pXJzogJ/Cfh7/wn4e8JywgJ0JXJzogJ/Cfh6fwn4e8JywgJ1pNJzogJ/Cfh7/wn4eyJyxcbiAgJ01XJzogJ/Cfh7Lwn4e8JywgJ01HJzogJ/Cfh7Lwn4esJywgJ01VJzogJ/Cfh7Lwn4e6JywgJ1NDJzogJ/Cfh7jwn4eoJywgJ0NWJzogJ/Cfh6jwn4e7JyxcbiAgJ01YJzogJ/Cfh7Lwn4e9JywgJ0dUJzogJ/Cfh6zwn4e5JywgJ0JaJzogJ/Cfh6fwn4e/JywgJ0NSJzogJ/Cfh6jwn4e3JywgJ1BBJzogJ/Cfh7Xwn4emJyxcbiAgJ0NPJzogJ/Cfh6jwn4e0JywgJ1ZFJzogJ/Cfh7vwn4eqJywgJ0dZJzogJ/Cfh6zwn4e+JywgJ1NSJzogJ/Cfh7jwn4e3JywgJ0dGJzogJ/Cfh6zwn4erJyxcbiAgJ0VDJzogJ/Cfh6rwn4eoJywgJ1BFJzogJ/Cfh7Xwn4eqJywgJ0JPJzogJ/Cfh6fwn4e0JywgJ1BZJzogJ/Cfh7Xwn4e+JywgJ1VZJzogJ/Cfh7rwn4e+JyxcbiAgJ0FSJzogJ/Cfh6bwn4e3JywgJ0NMJzogJ/Cfh6jwn4exJywgJ0ZLJzogJ/Cfh6vwn4ewJywgJ05aJzogJ/Cfh7Pwn4e/JywgJ0ZKJzogJ/Cfh6vwn4evJyxcbiAgJ05DJzogJ/Cfh7Pwn4eoJywgJ1BHJzogJ/Cfh7Xwn4esJywgJ1NCJzogJ/Cfh7jwn4enJywgJ1ZVJzogJ/Cfh7vwn4e6JywgJ1RPJzogJ/Cfh7nwn4e0JyxcbiAgJ1dTJzogJ/Cfh7zwn4e4JywgJ0tJJzogJ/Cfh7Dwn4euJywgJ1RWJzogJ/Cfh7nwn4e7JywgJ05SJzogJ/Cfh7Pwn4e3JywgJ1BXJzogJ/Cfh7Xwn4e8JyxcbiAgJ0ZNJzogJ/Cfh6vwn4eyJywgJ01IJzogJ/Cfh7Lwn4etJywgJ01QJzogJ/Cfh7Lwn4e1JywgJ0dVJzogJ/Cfh6zwn4e6JywgJ0FTJzogJ/Cfh6bwn4e4JyxcbiAgJ1BSJzogJ/Cfh7Xwn4e3JywgJ1ZJJzogJ/Cfh7vwn4euJywgJ1RDJzogJ/Cfh7nwn4eoJywgJ1ZHJzogJ/Cfh7vwn4esJywgJ0FJJzogJ/Cfh6bwn4euJyxcbn1cblxuLy8g5Zu95a625Luj56CB5Yiw5Lit5paH5ZCN56ew55qE5pig5bCEXG5jb25zdCBjb3VudHJ5TmFtZXM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gICdDTic6ICfkuK3lm70nLCAnVVMnOiAn576O5Zu9JywgJ0pQJzogJ+aXpeacrCcsICdLUic6ICfpn6nlm70nLCAnU0cnOiAn5paw5Yqg5Z2hJyxcbiAgJ0hLJzogJ+mmmea4rycsICdUVyc6ICflj7Dmub4nLCAnR0InOiAn6Iux5Zu9JywgJ1VLJzogJ+iLseWbvScsICdERSc6ICflvrflm70nLFxuICAnRlInOiAn5rOV5Zu9JywgJ05MJzogJ+iNt+WFsCcsICdSVSc6ICfkv4TnvZfmlq8nLCAnQ0EnOiAn5Yqg5ou/5aSnJywgJ0FVJzogJ+a+s+Wkp+WIqeS6micsXG4gICdCUic6ICflt7Topb8nLCAnSU4nOiAn5Y2w5bqmJywgJ0lUJzogJ+aEj+Wkp+WIqScsICdFUyc6ICfopb/nj63niZknLCAnU0UnOiAn55Ge5YW4JyxcbiAgJ05PJzogJ+aMquWogScsICdGSSc6ICfoiqzlhbAnLCAnREsnOiAn5Li56bqmJywgJ0NIJzogJ+eRnuWjqycsICdBVCc6ICflpaXlnLDliKknLFxuICAnQkUnOiAn5q+U5Yip5pe2JywgJ0lFJzogJ+eIseWwlOWFsCcsICdQVCc6ICfokaHokITniZknLCAnR1InOiAn5biM6IWKJywgJ1BMJzogJ+azouWFsCcsXG4gICdDWic6ICfmjbflhYsnLCAnSFUnOiAn5YyI54mZ5YipJywgJ1NLJzogJ+aWr+a0m+S8kOWFiycsICdTSSc6ICfmlq/mtJvmloflsLzkuponLFxuICAnSFInOiAn5YWL572X5Zyw5LqaJywgJ0JHJzogJ+S/neWKoOWIqeS6micsICdSTyc6ICfnvZfpqazlsLzkuponLCAnTFQnOiAn56uL6Zm25a6bJyxcbiAgJ0xWJzogJ+aLieiEsee7tOS6micsICdFRSc6ICfniLHmspnlsLzkuponLCAnVUEnOiAn5LmM5YWL5YWwJywgJ0JZJzogJ+eZveS/hOe9l+aWrycsXG4gICdNRCc6ICfmkanlsJTlpJrnk6YnLCAnR0UnOiAn5qC86bKB5ZCJ5LqaJywgJ0FNJzogJ+S6mue+juWwvOS6micsICdBWic6ICfpmL/loZ7mi5znloYnLFxuICAnS1onOiAn5ZOI6JCo5YWL5pav5Z2mJywgJ1VaJzogJ+S5jOWFueWIq+WFi+aWr+WdpicsICdLRyc6ICflkInlsJTlkInmlq/mlq/lnaYnLFxuICAnVEonOiAn5aGU5ZCJ5YWL5pav5Z2mJywgJ1RNJzogJ+Wcn+W6k+abvOaWr+WdpicsICdNTic6ICfokpnlj6QnLCAnTU0nOiAn57yF55S4JyxcbiAgJ0xBJzogJ+iAgeaMnScsICdLSCc6ICfmn6zln5Tlr6gnLCAnVk4nOiAn6LaK5Y2XJywgJ1RIJzogJ+azsOWbvScsICdNWSc6ICfpqazmnaXopb/kuponLFxuICAnSUQnOiAn5Y2w5bqm5bC86KW/5LqaJywgJ1BIJzogJ+iPsuW+i+WuvicsICdCRCc6ICflrZ/liqDmi4nlm70nLCAnUEsnOiAn5be05Z+65pav5Z2mJyxcbiAgJ0xLJzogJ+aWr+mHjOWFsOWNoScsICdOUCc6ICflsLzms4rlsJQnLCAnQUYnOiAn6Zi/5a+M5rGXJywgJ0lSJzogJ+S8iuaclycsXG4gICdJUSc6ICfkvIrmi4nlhYsnLCAnU1knOiAn5Y+Z5Yip5LqaJywgJ0xCJzogJ+m7juW3tOWrqScsICdKTyc6ICfnuqbml6YnLFxuICAnUFMnOiAn5be05YuS5pav5Z2mJywgJ0lMJzogJ+S7peiJsuWIlycsICdTQSc6ICfmspnnibnpmL/mi4nkvK8nLCAnQUUnOiAn6Zi/6IGU6YWLJyxcbiAgJ1FBJzogJ+WNoeWhlOWwlCcsICdLVyc6ICfnp5HlqIHnibknLCAnQkgnOiAn5be05p6XJywgJ09NJzogJ+mYv+abvCcsICdZRSc6ICfkuZ/pl6gnLFxuICAnRUcnOiAn5Z+D5Y+KJywgJ0xZJzogJ+WIqeavlOS6micsICdUTic6ICfnqoHlsLzmlq8nLCAnRFonOiAn6Zi/5bCU5Y+K5Yip5LqaJyxcbiAgJ01BJzogJ+aRqea0m+WTpScsICdaQSc6ICfljZfpnZ4nLCAnTkcnOiAn5bC85pel5Yip5LqaJywgJ0tFJzogJ+iCr+WwvOS6micsXG4gICdFVCc6ICfln4PloZ7kv4Tmr5TkuponLCAnR0gnOiAn5Yqg57qzJywgJ1VHJzogJ+S5jOW5sui+vicsICdUWic6ICflnabmoZHlsLzkuponLFxuICAnTVonOiAn6I6r5qGR5q+U5YWLJywgJ1pXJzogJ+a0peW3tOW4g+mfpicsICdCVyc6ICfljZrojKjnk6bnurMnLCAnWk0nOiAn6LWe5q+U5LqaJyxcbiAgJ01XJzogJ+mprOaLiee7tCcsICdNRyc6ICfpqazovr7liqDmlq/liqAnLCAnTVUnOiAn5q+b6YeM5rGC5pavJywgJ1NDJzogJ+WhnuiIjOWwlCcsXG4gICdDVic6ICfkvZvlvpfop5InLCAnTVgnOiAn5aKo6KW/5ZOlJywgJ0dUJzogJ+WNseWcsOmprOaLiScsICdCWic6ICfkvK/liKnlhbknLFxuICAnQ1InOiAn5ZOl5pav6L6+6buO5YqgJywgJ1BBJzogJ+W3tOaLv+mprCcsICdDTyc6ICflk6XkvKbmr5TkuponLCAnVkUnOiAn5aeU5YaF55Ge5ouJJyxcbiAgJ0dZJzogJ+WcreS6mumCoycsICdTUic6ICfoi4/ph4zljZcnLCAnR0YnOiAn5rOV5bGe5Zyt5Lqa6YKjJywgJ0VDJzogJ+WOhOeTnOWkmuWwlCcsXG4gICdQRSc6ICfnp5jpsoEnLCAnQk8nOiAn54675Yip57u05LqaJywgJ1BZJzogJ+W3tOaLieWcrScsICdVWSc6ICfkuYzmi4nlnK0nLFxuICAnQVInOiAn6Zi/5qC55bu3JywgJ0NMJzogJ+aZuuWIqScsICdGSyc6ICfnpo/lhYvlhbDnvqTlspsnLCAnTlonOiAn5paw6KW/5YWwJyxcbiAgJ0ZKJzogJ+aWkOa1jicsICdOQyc6ICfmlrDlloDph4zlpJrlsLzkuponLCAnUEcnOiAn5be05biD5Lqa5paw5Yeg5YaF5LqaJyxcbiAgJ1NCJzogJ+aJgOe9l+mXqOe+pOWymycsICdWVSc6ICfnk6bliqrpmL/lm74nLCAnVE8nOiAn5rGk5YqgJywgJ1dTJzogJ+iQqOaRqeS6micsXG4gICdLSSc6ICfln7rph4zlt7Tmlq8nLCAnVFYnOiAn5Zu+55Om5Y2iJywgJ05SJzogJ+eRmemygScsICdQVyc6ICfluJXlirMnLFxuICAnRk0nOiAn5a+G5YWL572X5bC86KW/5LqaJywgJ01IJzogJ+mprOe7jeWwlOe+pOWymycsICdNUCc6ICfljJfpqazph4zkuprnurPnvqTlspsnLFxuICAnR1UnOiAn5YWz5bKbJywgJ0FTJzogJ+e+juWxnuiQqOaRqeS6micsICdQUic6ICfms6LlpJrpu47lkIQnLCAnVkknOiAn576O5bGe57u05bCU5Lqs576k5bKbJyxcbiAgJ1RDJzogJ+eJueWFi+aWr+WSjOWHr+enkeaWr+e+pOWymycsICdWRyc6ICfoi7HlsZ7nu7TlsJTkuqznvqTlspsnLCAnQUknOiAn5a6J5Zyt5ouJJyxcbn1cblxuLy8gQVBJ5ZON5bqU5o6l5Y+jXG5pbnRlcmZhY2UgSVBBUElSZXNwb25zZSB7XG4gIHN0YXR1czogc3RyaW5nXG4gIGNvdW50cnk6IHN0cmluZ1xuICBjb3VudHJ5Q29kZTogc3RyaW5nXG4gIHJlZ2lvbjogc3RyaW5nXG4gIHJlZ2lvbk5hbWU6IHN0cmluZ1xuICBjaXR5OiBzdHJpbmdcbiAgemlwOiBzdHJpbmdcbiAgbGF0OiBudW1iZXJcbiAgbG9uOiBudW1iZXJcbiAgdGltZXpvbmU6IHN0cmluZ1xuICBpc3A6IHN0cmluZ1xuICBvcmc6IHN0cmluZ1xuICBhczogc3RyaW5nXG4gIHF1ZXJ5OiBzdHJpbmdcbn1cblxuaW50ZXJmYWNlIElQSW5mb1Jlc3BvbnNlIHtcbiAgaXA6IHN0cmluZ1xuICBjaXR5OiBzdHJpbmdcbiAgcmVnaW9uOiBzdHJpbmdcbiAgY291bnRyeTogc3RyaW5nXG4gIGxvYzogc3RyaW5nXG4gIG9yZzogc3RyaW5nXG4gIHRpbWV6b25lOiBzdHJpbmdcbn1cblxuLy8gSVDlnLDlnYDnvJPlrZggLSDnlKjkuo7pgb/lhY3ph43lpI3mn6Xor6JcbmNvbnN0IGxvY2F0aW9uQ2FjaGUgPSBuZXcgTWFwPHN0cmluZywgeyBkYXRhOiBMb2NhdGlvbkluZm87IHRpbWVzdGFtcDogbnVtYmVyIH0+KClcbmNvbnN0IENBQ0hFX0VYUElSWSA9IDI0ICogNjAgKiA2MCAqIDEwMDAgLy8gMjTlsI/ml7bnvJPlrZjov4fmnJ/ml7bpl7RcblxuLyoqXG4gKiDkvb/nlKjlhY3otLlBUEnmo4DmtYtJUOWcsOWdgOW9kuWxnuWcsFxuICogQHBhcmFtIGhvc3QgSVDlnLDlnYDmiJbln5/lkI1cbiAqIEByZXR1cm5zIOW9kuWxnuWcsOS/oeaBr1Byb21pc2VcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRldGVjdExvY2F0aW9uT25saW5lKGhvc3Q6IHN0cmluZyk6IFByb21pc2U8TG9jYXRpb25JbmZvPiB7XG4gIGNvbnN0IGNsZWFuSG9zdCA9IGhvc3QudG9Mb3dlckNhc2UoKS50cmltKClcbiAgXG4gIC8vIOajgOafpee8k+WtmFxuICBjb25zdCBjYWNoZWQgPSBsb2NhdGlvbkNhY2hlLmdldChjbGVhbkhvc3QpXG4gIGlmIChjYWNoZWQgJiYgRGF0ZS5ub3coKSAtIGNhY2hlZC50aW1lc3RhbXAgPCBDQUNIRV9FWFBJUlkpIHtcbiAgICByZXR1cm4gY2FjaGVkLmRhdGFcbiAgfVxuICBcbiAgLy8g5aSE55CG54m55q6K5Zyw5Z2AXG4gIGlmIChjbGVhbkhvc3QgPT09ICcxMjcuMC4wLjEnIHx8IGNsZWFuSG9zdCA9PT0gJ2xvY2FsaG9zdCcpIHtcbiAgICBjb25zdCByZXN1bHQgPSB7IGxvY2F0aW9uOiAn5pys5Zyw5Li75py6JywgY291bnRyeUNvZGU6ICdMT0NBTEhPU1QnLCBmbGFnOiAn8J+SuycgfVxuICAgIGxvY2F0aW9uQ2FjaGUuc2V0KGNsZWFuSG9zdCwgeyBkYXRhOiByZXN1bHQsIHRpbWVzdGFtcDogRGF0ZS5ub3coKSB9KVxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuICBcbiAgLy8g5qOA5p+l56eB5pyJSVDlnLDlnYBcbiAgaWYgKC9eXFxkK1xcLlxcZCtcXC5cXGQrXFwuXFxkKyQvLnRlc3QoY2xlYW5Ib3N0KSkge1xuICAgIGNvbnN0IHNlZ21lbnRzID0gY2xlYW5Ib3N0LnNwbGl0KCcuJykubWFwKE51bWJlcilcbiAgICBjb25zdCBbZmlyc3QsIHNlY29uZF0gPSBzZWdtZW50c1xuICAgIFxuICAgIGlmIChmaXJzdCA9PT0gMTkyICYmIHNlY29uZCA9PT0gMTY4KSB7XG4gICAgICBjb25zdCByZXN1bHQgPSB7IGxvY2F0aW9uOiAn5pys5Zyw572R57ucJywgY291bnRyeUNvZGU6ICdMT0NBTCcsIGZsYWc6ICfwn4+gJyB9XG4gICAgICBsb2NhdGlvbkNhY2hlLnNldChjbGVhbkhvc3QsIHsgZGF0YTogcmVzdWx0LCB0aW1lc3RhbXA6IERhdGUubm93KCkgfSlcbiAgICAgIHJldHVybiByZXN1bHRcbiAgICB9XG4gICAgaWYgKGZpcnN0ID09PSAxMCkge1xuICAgICAgY29uc3QgcmVzdWx0ID0geyBsb2NhdGlvbjogJ+acrOWcsOe9kee7nCcsIGNvdW50cnlDb2RlOiAnTE9DQUwnLCBmbGFnOiAn8J+PoCcgfVxuICAgICAgbG9jYXRpb25DYWNoZS5zZXQoY2xlYW5Ib3N0LCB7IGRhdGE6IHJlc3VsdCwgdGltZXN0YW1wOiBEYXRlLm5vdygpIH0pXG4gICAgICByZXR1cm4gcmVzdWx0XG4gICAgfVxuICAgIGlmIChmaXJzdCA9PT0gMTcyICYmIHNlY29uZCA+PSAxNiAmJiBzZWNvbmQgPD0gMzEpIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHsgbG9jYXRpb246ICfmnKzlnLDnvZHnu5wnLCBjb3VudHJ5Q29kZTogJ0xPQ0FMJywgZmxhZzogJ/Cfj6AnIH1cbiAgICAgIGxvY2F0aW9uQ2FjaGUuc2V0KGNsZWFuSG9zdCwgeyBkYXRhOiByZXN1bHQsIHRpbWVzdGFtcDogRGF0ZS5ub3coKSB9KVxuICAgICAgcmV0dXJuIHJlc3VsdFxuICAgIH1cbiAgfVxuICBcbiAgLy8g5aaC5p6c5piv5Z+f5ZCN77yM5YWI6L+b6KGM5Z+f5ZCN5ZCO57yA5b+r6YCf5Yik5patXG4gIGxldCB0YXJnZXRJUCA9IGNsZWFuSG9zdFxuICBpZiAoIS9eXFxkK1xcLlxcZCtcXC5cXGQrXFwuXFxkKyQvLnRlc3QoY2xlYW5Ib3N0KSkge1xuICAgIGNvbnN0IHBhcnRzID0gY2xlYW5Ib3N0LnNwbGl0KCcuJylcbiAgICBpZiAocGFydHMubGVuZ3RoID49IDIpIHtcbiAgICAgIGNvbnN0IHRsZCA9IHBhcnRzW3BhcnRzLmxlbmd0aCAtIDFdXG4gICAgICBjb25zdCBkb21haW5Mb2NhdGlvbk1hcDogUmVjb3JkPHN0cmluZywgTG9jYXRpb25JbmZvPiA9IHtcbiAgICAgICAgJ2NuJzogeyBsb2NhdGlvbjogJ+S4reWbvScsIGNvdW50cnlDb2RlOiAnQ04nLCBmbGFnOiAn8J+HqPCfh7MnIH0sXG4gICAgICAgICd1cyc6IHsgbG9jYXRpb246ICfnvo7lm70nLCBjb3VudHJ5Q29kZTogJ1VTJywgZmxhZzogJ/Cfh7rwn4e4JyB9LFxuICAgICAgICAnanAnOiB7IGxvY2F0aW9uOiAn5pel5pysJywgY291bnRyeUNvZGU6ICdKUCcsIGZsYWc6ICfwn4ev8J+HtScgfSxcbiAgICAgICAgJ2tyJzogeyBsb2NhdGlvbjogJ+mfqeWbvScsIGNvdW50cnlDb2RlOiAnS1InLCBmbGFnOiAn8J+HsPCfh7cnIH0sXG4gICAgICAgICdzZyc6IHsgbG9jYXRpb246ICfmlrDliqDlnaEnLCBjb3VudHJ5Q29kZTogJ1NHJywgZmxhZzogJ/Cfh7jwn4esJyB9LFxuICAgICAgICAnaGsnOiB7IGxvY2F0aW9uOiAn6aaZ5rivJywgY291bnRyeUNvZGU6ICdISycsIGZsYWc6ICfwn4et8J+HsCcgfSxcbiAgICAgICAgJ3R3JzogeyBsb2NhdGlvbjogJ+WPsOa5vicsIGNvdW50cnlDb2RlOiAnVFcnLCBmbGFnOiAn8J+HufCfh7wnIH0sXG4gICAgICAgICdkZSc6IHsgbG9jYXRpb246ICflvrflm70nLCBjb3VudHJ5Q29kZTogJ0RFJywgZmxhZzogJ/Cfh6nwn4eqJyB9LFxuICAgICAgICAnZnInOiB7IGxvY2F0aW9uOiAn5rOV5Zu9JywgY291bnRyeUNvZGU6ICdGUicsIGZsYWc6ICfwn4er8J+HtycgfSxcbiAgICAgICAgJ25sJzogeyBsb2NhdGlvbjogJ+iNt+WFsCcsIGNvdW50cnlDb2RlOiAnTkwnLCBmbGFnOiAn8J+Hs/Cfh7EnIH0sXG4gICAgICAgICdydSc6IHsgbG9jYXRpb246ICfkv4TnvZfmlq8nLCBjb3VudHJ5Q29kZTogJ1JVJywgZmxhZzogJ/Cfh7fwn4e6JyB9LFxuICAgICAgICAnY2EnOiB7IGxvY2F0aW9uOiAn5Yqg5ou/5aSnJywgY291bnRyeUNvZGU6ICdDQScsIGZsYWc6ICfwn4eo8J+HpicgfSxcbiAgICAgICAgJ2F1JzogeyBsb2NhdGlvbjogJ+a+s+Wkp+WIqeS6micsIGNvdW50cnlDb2RlOiAnQVUnLCBmbGFnOiAn8J+HpvCfh7onIH0sXG4gICAgICAgICd1ayc6IHsgbG9jYXRpb246ICfoi7Hlm70nLCBjb3VudHJ5Q29kZTogJ0dCJywgZmxhZzogJ/Cfh6zwn4enJyB9LFxuICAgICAgfVxuICAgICAgXG4gICAgICBpZiAoZG9tYWluTG9jYXRpb25NYXBbdGxkXSkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBkb21haW5Mb2NhdGlvbk1hcFt0bGRdXG4gICAgICAgIGxvY2F0aW9uQ2FjaGUuc2V0KGNsZWFuSG9zdCwgeyBkYXRhOiByZXN1bHQsIHRpbWVzdGFtcDogRGF0ZS5ub3coKSB9KVxuICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgICB9XG4gICAgfVxuICB9XG4gIFxuICAvLyDlsJ3or5XlpJrkuKrlhY3otLlBUElcbiAgY29uc3QgYXBpcyA9IFtcbiAgICAoKSA9PiBmZXRjaEZyb21JUEFQSSh0YXJnZXRJUCksXG4gICAgKCkgPT4gZmV0Y2hGcm9tSVBJbmZvKHRhcmdldElQKSxcbiAgXVxuICBcbiAgZm9yIChjb25zdCBhcGkgb2YgYXBpcykge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBhcGkoKVxuICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICBsb2NhdGlvbkNhY2hlLnNldChjbGVhbkhvc3QsIHsgZGF0YTogcmVzdWx0LCB0aW1lc3RhbXA6IERhdGUubm93KCkgfSlcbiAgICAgICAgLy8g6YCa55+l55uR5ZCs5Zmo5L2N572u5L+h5oGv5bey5pu05pawXG4gICAgICAgIG5vdGlmeUxvY2F0aW9uVXBkYXRlKGNsZWFuSG9zdCwgcmVzdWx0KVxuICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUud2FybignQVBJ6LCD55So5aSx6LSlOicsIGVycm9yKVxuICAgICAgY29udGludWVcbiAgICB9XG4gIH1cbiAgXG4gIC8vIOaJgOaciUFQSemDveWksei0pe+8jOi/lOWbnum7mOiupOWAvFxuICBjb25zdCBmYWxsYmFjayA9IHsgbG9jYXRpb246ICfmnKrnn6UnLCBjb3VudHJ5Q29kZTogJ1VOS05PV04nLCBmbGFnOiAn8J+MkCcgfVxuICBsb2NhdGlvbkNhY2hlLnNldChjbGVhbkhvc3QsIHsgZGF0YTogZmFsbGJhY2ssIHRpbWVzdGFtcDogRGF0ZS5ub3coKSB9KVxuICBub3RpZnlMb2NhdGlvblVwZGF0ZShjbGVhbkhvc3QsIGZhbGxiYWNrKVxuICByZXR1cm4gZmFsbGJhY2tcbn1cblxuLyoqXG4gKiDkvb/nlKhpcC1hcGkuY29t6I635Y+W5b2S5bGe5Zyw5L+h5oGv77yI5YWN6LS577yM5peg6ZyAQVBJ5a+G6ZKl77yJXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGZldGNoRnJvbUlQQVBJKGlwOiBzdHJpbmcpOiBQcm9taXNlPExvY2F0aW9uSW5mbyB8IG51bGw+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwOi8vaXAtYXBpLmNvbS9qc29uLyR7aXB9P2xhbmc9emgtQ04mZmllbGRzPXN0YXR1cyxjb3VudHJ5LGNvdW50cnlDb2RlLHJlZ2lvbixyZWdpb25OYW1lLGNpdHksaXNwLHF1ZXJ5YCwge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgIH0sXG4gICAgfSlcbiAgICBcbiAgICBpZiAoIXJlc3BvbnNlLm9rKSByZXR1cm4gbnVsbFxuICAgIFxuICAgIGNvbnN0IGRhdGE6IElQQVBJUmVzcG9uc2UgPSBhd2FpdCByZXNwb25zZS5qc29uKClcbiAgICBpZiAoZGF0YS5zdGF0dXMgIT09ICdzdWNjZXNzJykgcmV0dXJuIG51bGxcbiAgICBcbiAgICBjb25zdCBjb3VudHJ5Q29kZSA9IGRhdGEuY291bnRyeUNvZGVcbiAgICBjb25zdCBmbGFnID0gY291bnRyeUZsYWdzW2NvdW50cnlDb2RlXSB8fCAn8J+MkCdcbiAgICBjb25zdCBjb3VudHJ5TmFtZSA9IGNvdW50cnlOYW1lc1tjb3VudHJ5Q29kZV0gfHwgZGF0YS5jb3VudHJ5XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgIGxvY2F0aW9uOiBkYXRhLmNpdHkgPyBgJHtjb3VudHJ5TmFtZX0gJHtkYXRhLmNpdHl9YCA6IGNvdW50cnlOYW1lLFxuICAgICAgY291bnRyeUNvZGUsXG4gICAgICBmbGFnLFxuICAgICAgY2l0eTogZGF0YS5jaXR5LFxuICAgICAgcmVnaW9uOiBkYXRhLnJlZ2lvbk5hbWUsXG4gICAgICBpc3A6IGRhdGEuaXNwXG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUud2FybignSVAtQVBJ6LCD55So5aSx6LSlOicsIGVycm9yKVxuICAgIHJldHVybiBudWxsXG4gIH1cbn1cblxuLyoqXG4gKiDkvb/nlKhpcGluZm8uaW/ojrflj5blvZLlsZ7lnLDkv6Hmga/vvIjlhY3otLnvvIzkvYbmnInor7fmsYLpmZDliLbvvIlcbiAqL1xuYXN5bmMgZnVuY3Rpb24gZmV0Y2hGcm9tSVBJbmZvKGlwOiBzdHJpbmcpOiBQcm9taXNlPExvY2F0aW9uSW5mbyB8IG51bGw+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwczovL2lwaW5mby5pby8ke2lwfS9qc29uYCwge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgIH0sXG4gICAgfSlcbiAgICBcbiAgICBpZiAoIXJlc3BvbnNlLm9rKSByZXR1cm4gbnVsbFxuICAgIFxuICAgIGNvbnN0IGRhdGE6IElQSW5mb1Jlc3BvbnNlID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXG4gICAgY29uc3QgY291bnRyeUNvZGUgPSBkYXRhLmNvdW50cnlcbiAgICBjb25zdCBmbGFnID0gY291bnRyeUZsYWdzW2NvdW50cnlDb2RlXSB8fCAn8J+MkCdcbiAgICBjb25zdCBjb3VudHJ5TmFtZSA9IGNvdW50cnlOYW1lc1tjb3VudHJ5Q29kZV0gfHwgZGF0YS5jb3VudHJ5XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgIGxvY2F0aW9uOiBkYXRhLmNpdHkgPyBgJHtjb3VudHJ5TmFtZX0gJHtkYXRhLmNpdHl9YCA6IGNvdW50cnlOYW1lLFxuICAgICAgY291bnRyeUNvZGUsXG4gICAgICBmbGFnLFxuICAgICAgY2l0eTogZGF0YS5jaXR5LFxuICAgICAgcmVnaW9uOiBkYXRhLnJlZ2lvbixcbiAgICAgIGlzcDogZGF0YS5vcmdcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS53YXJuKCdJUEluZm/osIPnlKjlpLHotKU6JywgZXJyb3IpXG4gICAgcmV0dXJuIG51bGxcbiAgfVxufVxuXG4vLyDkvb/nlKjml6fnmoRJUOiMg+WbtOajgOa1i+S9nOS4uuWkh+eUqOaWueahiFxuY29uc3QgaXBSYW5nZUxpc3Q6IEFycmF5PHsgcGF0dGVybjogUmVnRXhwOyBpbmZvOiBMb2NhdGlvbkluZm8gfT4gPSBbXG4gIC8vIOS4reWbvVxuICB7IHBhdHRlcm46IC9eKDF8MTR8Mjd8MzZ8Mzl8NDJ8NTh8NTl8NjB8NjF8MTAxfDEwM3wxMDZ8MTEwfDExMXwxMTJ8MTEzfDExNHwxMTV8MTE2fDExN3wxMTh8MTE5fDEyMHwxMjF8MTIyfDEyM3wxMjR8MTI1KVxcLi8sIGluZm86IHsgbG9jYXRpb246ICfkuK3lm70nLCBjb3VudHJ5Q29kZTogJ0NOJywgZmxhZzogJ/Cfh6jwn4ezJyB9fSxcbiAgLy8g576O5Zu9XG4gIHsgcGF0dGVybjogL14oM3w0fDZ8N3w4fDl8MTF8MTJ8MTN8MTV8MTZ8MTd8MTh8MTl8MjB8MjN8MjR8MzR8MzV8NDB8NDR8NDV8NDd8NTB8NTJ8NTR8NjN8NjR8NjV8NjZ8Njd8Njh8Njl8NzB8NzF8NzJ8NzN8NzR8NzV8NzYpXFwuLywgaW5mbzogeyBsb2NhdGlvbjogJ+e+juWbvScsIGNvdW50cnlDb2RlOiAnVVMnLCBmbGFnOiAn8J+HuvCfh7gnIH19LFxuICAvLyDlhbbku5blm73lrrZcbiAgeyBwYXR0ZXJuOiAvXigxMjZ8MTMzfDE1M3wyMTB8MjExfDIxOHwyMTl8MjIwKVxcLi8sIGluZm86IHsgbG9jYXRpb246ICfml6XmnKwnLCBjb3VudHJ5Q29kZTogJ0pQJywgZmxhZzogJ/Cfh6/wn4e1JyB9fSxcbl1cblxuLyoqXG4gKiDlhbzlrrnml6fniYjmnKznmoTlkIzmraXmo4DmtYvlh73mlbDvvIjkvJjlhYjkvb/nlKjnvJPlrZjvvIzkuI3lrZjlnKjliJnov5Tlm57pu5jorqTlgLzlubbop6blj5HlvILmraXmn6Xor6LvvIlcbiAqIEBwYXJhbSBob3N0IElQ5Zyw5Z2A5oiW5Z+f5ZCNXG4gKiBAcmV0dXJucyDlvZLlsZ7lnLDkv6Hmga9cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRldGVjdExvY2F0aW9uKGhvc3Q6IHN0cmluZyk6IExvY2F0aW9uSW5mbyB7XG4gIGNvbnN0IGNsZWFuSG9zdCA9IGhvc3QudG9Mb3dlckNhc2UoKS50cmltKClcbiAgXG4gIC8vIOajgOafpee8k+WtmFxuICBjb25zdCBjYWNoZWQgPSBsb2NhdGlvbkNhY2hlLmdldChjbGVhbkhvc3QpXG4gIGlmIChjYWNoZWQgJiYgRGF0ZS5ub3coKSAtIGNhY2hlZC50aW1lc3RhbXAgPCBDQUNIRV9FWFBJUlkpIHtcbiAgICByZXR1cm4gY2FjaGVkLmRhdGFcbiAgfVxuICBcbiAgLy8g5b+r6YCf5qOA5p+l54m55q6K5Zyw5Z2AXG4gIGlmIChjbGVhbkhvc3QgPT09ICcxMjcuMC4wLjEnIHx8IGNsZWFuSG9zdCA9PT0gJ2xvY2FsaG9zdCcpIHtcbiAgICByZXR1cm4geyBsb2NhdGlvbjogJ+acrOWcsOS4u+acuicsIGNvdW50cnlDb2RlOiAnTE9DQUxIT1NUJywgZmxhZzogJ/CfkrsnIH1cbiAgfVxuICBcbiAgLy8g5qOA5p+l56eB5pyJSVBcbiAgaWYgKC9eXFxkK1xcLlxcZCtcXC5cXGQrXFwuXFxkKyQvLnRlc3QoY2xlYW5Ib3N0KSkge1xuICAgIGNvbnN0IHNlZ21lbnRzID0gY2xlYW5Ib3N0LnNwbGl0KCcuJykubWFwKE51bWJlcilcbiAgICBjb25zdCBbZmlyc3QsIHNlY29uZF0gPSBzZWdtZW50c1xuICAgIFxuICAgIGlmIChmaXJzdCA9PT0gMTkyICYmIHNlY29uZCA9PT0gMTY4KSB7XG4gICAgICByZXR1cm4geyBsb2NhdGlvbjogJ+acrOWcsOe9kee7nCcsIGNvdW50cnlDb2RlOiAnTE9DQUwnLCBmbGFnOiAn77+9JyB9XG4gICAgfVxuICAgIGlmIChmaXJzdCA9PT0gMTApIHtcbiAgICAgIHJldHVybiB7IGxvY2F0aW9uOiAn5pys5Zyw572R57ucJywgY291bnRyeUNvZGU6ICdMT0NBTCcsIGZsYWc6ICfvv70nIH1cbiAgICB9XG4gICAgaWYgKGZpcnN0ID09PSAxNzIgJiYgc2Vjb25kID49IDE2ICYmIHNlY29uZCA8PSAzMSkge1xuICAgICAgcmV0dXJuIHsgbG9jYXRpb246ICfmnKzlnLDnvZHnu5wnLCBjb3VudHJ5Q29kZTogJ0xPQ0FMJywgZmxhZzogJ++/vScgfVxuICAgIH1cbiAgICBcbiAgICAvLyDlsJ3or5Xkvb/nlKjlpIfnlKhJUOauteajgOa1i1xuICAgIGZvciAoY29uc3QgeyBwYXR0ZXJuLCBpbmZvIH0gb2YgaXBSYW5nZUxpc3QpIHtcbiAgICAgIGlmIChwYXR0ZXJuLnRlc3QoY2xlYW5Ib3N0KSkge1xuICAgICAgICByZXR1cm4gaW5mb1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBcbiAgLy8g5Z+f5ZCN5ZCO57yA5b+r6YCf5Yik5patXG4gIGlmICghL15cXGQrXFwuXFxkK1xcLlxcZCtcXC5cXGQrJC8udGVzdChjbGVhbkhvc3QpKSB7XG4gICAgY29uc3QgcGFydHMgPSBjbGVhbkhvc3Quc3BsaXQoJy4nKVxuICAgIGlmIChwYXJ0cy5sZW5ndGggPj0gMikge1xuICAgICAgY29uc3QgdGxkID0gcGFydHNbcGFydHMubGVuZ3RoIC0gMV1cbiAgICAgIGNvbnN0IGRvbWFpbkxvY2F0aW9uTWFwOiBSZWNvcmQ8c3RyaW5nLCBMb2NhdGlvbkluZm8+ID0ge1xuICAgICAgICAnY24nOiB7IGxvY2F0aW9uOiAn5Lit5Zu9JywgY291bnRyeUNvZGU6ICdDTicsIGZsYWc6ICfwn4eo8J+HsycgfSxcbiAgICAgICAgJ3VzJzogeyBsb2NhdGlvbjogJ+e+juWbvScsIGNvdW50cnlDb2RlOiAnVVMnLCBmbGFnOiAn8J+HuvCfh7gnIH0sXG4gICAgICAgICdqcCc6IHsgbG9jYXRpb246ICfml6XmnKwnLCBjb3VudHJ5Q29kZTogJ0pQJywgZmxhZzogJ/Cfh6/wn4e1JyB9LFxuICAgICAgICAna3InOiB7IGxvY2F0aW9uOiAn6Z+p5Zu9JywgY291bnRyeUNvZGU6ICdLUicsIGZsYWc6ICfwn4ew8J+HtycgfSxcbiAgICAgICAgJ3NnJzogeyBsb2NhdGlvbjogJ+aWsOWKoOWdoScsIGNvdW50cnlDb2RlOiAnU0cnLCBmbGFnOiAn8J+HuPCfh6wnIH0sXG4gICAgICAgICdoayc6IHsgbG9jYXRpb246ICfpppnmuK8nLCBjb3VudHJ5Q29kZTogJ0hLJywgZmxhZzogJ/Cfh63wn4ewJyB9LFxuICAgICAgICAndHcnOiB7IGxvY2F0aW9uOiAn5Y+w5rm+JywgY291bnRyeUNvZGU6ICdUVycsIGZsYWc6ICfwn4e58J+HvCcgfSxcbiAgICAgICAgJ2RlJzogeyBsb2NhdGlvbjogJ+W+t+WbvScsIGNvdW50cnlDb2RlOiAnREUnLCBmbGFnOiAn8J+HqfCfh6onIH0sXG4gICAgICAgICdmcic6IHsgbG9jYXRpb246ICfms5Xlm70nLCBjb3VudHJ5Q29kZTogJ0ZSJywgZmxhZzogJ/Cfh6vwn4e3JyB9LFxuICAgICAgICAnbmwnOiB7IGxvY2F0aW9uOiAn6I235YWwJywgY291bnRyeUNvZGU6ICdOTCcsIGZsYWc6ICfwn4ez8J+HsScgfSxcbiAgICAgICAgJ3J1JzogeyBsb2NhdGlvbjogJ+S/hOe9l+aWrycsIGNvdW50cnlDb2RlOiAnUlUnLCBmbGFnOiAn8J+Ht/Cfh7onIH0sXG4gICAgICAgICdjYSc6IHsgbG9jYXRpb246ICfliqDmi7/lpKcnLCBjb3VudHJ5Q29kZTogJ0NBJywgZmxhZzogJ/Cfh6jwn4emJyB9LFxuICAgICAgICAnYXUnOiB7IGxvY2F0aW9uOiAn5r6z5aSn5Yip5LqaJywgY291bnRyeUNvZGU6ICdBVScsIGZsYWc6ICfwn4em8J+HuicgfSxcbiAgICAgICAgJ3VrJzogeyBsb2NhdGlvbjogJ+iLseWbvScsIGNvdW50cnlDb2RlOiAnR0InLCBmbGFnOiAn77+977+9JyB9LFxuICAgICAgfVxuICAgICAgXG4gICAgICBpZiAoZG9tYWluTG9jYXRpb25NYXBbdGxkXSkge1xuICAgICAgICByZXR1cm4gZG9tYWluTG9jYXRpb25NYXBbdGxkXVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBcbiAgLy8g5aaC5p6c57yT5a2Y5Lit5rKh5pyJ77yM6L+U5ZueXCLmn6Xor6LkuK1cIuW5tuinpuWPkeW8guatpeafpeivolxuICBkZXRlY3RMb2NhdGlvbk9ubGluZShjbGVhbkhvc3QpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAvLyDlvILmraXmn6Xor6LlrozmiJDlkI7kvJroh6rliqjop6blj5Fub3RpZnlMb2NhdGlvblVwZGF0ZVxuICB9KS5jYXRjaChjb25zb2xlLmVycm9yKVxuICByZXR1cm4geyBsb2NhdGlvbjogJ+afpeivouS4rS4uLicsIGNvdW50cnlDb2RlOiAnTE9BRElORycsIGZsYWc6ICfwn5SNJyB9XG59XG5cbi8qKlxuICog6I635Y+W5b2S5bGe5Zyw5pi+56S65paH5pysXG4gKiBAcGFyYW0gaG9zdCBJUOWcsOWdgOaIluWfn+WQjVxuICogQHJldHVybnMg5bim5Zu95peX55qE5b2S5bGe5Zyw5paH5pysXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRMb2NhdGlvbkRpc3BsYXkoaG9zdDogc3RyaW5nKTogc3RyaW5nIHtcbiAgY29uc3QgaW5mbyA9IGRldGVjdExvY2F0aW9uKGhvc3QpXG4gIHJldHVybiBgJHtpbmZvLmZsYWd9ICR7aW5mby5sb2NhdGlvbn1gXG59XG5cbi8qKlxuICog6I635Y+W566A55+t55qE5b2S5bGe5Zyw5pi+56S6XG4gKiBAcGFyYW0gaG9zdCBJUOWcsOWdgOaIluWfn+WQjVxuICogQHJldHVybnMg566A55+t55qE5b2S5bGe5Zyw5paH5pysXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRMb2NhdGlvblNob3J0KGhvc3Q6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IGluZm8gPSBkZXRlY3RMb2NhdGlvbihob3N0KVxuICByZXR1cm4gaW5mby5sb2NhdGlvblxufVxuXG4vKipcbiAqIOa4hemZpOe8k+WtmFxuICovXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJMb2NhdGlvbkNhY2hlKCk6IHZvaWQge1xuICBsb2NhdGlvbkNhY2hlLmNsZWFyKClcbn1cblxuLyoqXG4gKiDpooTliqDovb3luLjnlKhJUOeahOW9kuWxnuWcsOS/oeaBr1xuICogQHBhcmFtIGhvc3RzIElQ5Zyw5Z2A5pWw57uEXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwcmVsb2FkTG9jYXRpb25zKGhvc3RzOiBzdHJpbmdbXSk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBwcm9taXNlcyA9IGhvc3RzLm1hcChob3N0ID0+IFxuICAgIGRldGVjdExvY2F0aW9uT25saW5lKGhvc3QpLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGNvbnNvbGUud2Fybihg6aKE5Yqg6L29SVAgJHtob3N0fSDlpLHotKU6YCwgZXJyb3IpXG4gICAgICByZXR1cm4gbnVsbFxuICAgIH0pXG4gIClcbiAgXG4gIGF3YWl0IFByb21pc2UuYWxsU2V0dGxlZChwcm9taXNlcylcbn1cbiIsImV4cG9ydHMuaW50ZXJvcERlZmF1bHQgPSBmdW5jdGlvbiAoYSkge1xuICByZXR1cm4gYSAmJiBhLl9fZXNNb2R1bGUgPyBhIDoge2RlZmF1bHQ6IGF9O1xufTtcblxuZXhwb3J0cy5kZWZpbmVJbnRlcm9wRmxhZyA9IGZ1bmN0aW9uIChhKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShhLCAnX19lc01vZHVsZScsIHt2YWx1ZTogdHJ1ZX0pO1xufTtcblxuZXhwb3J0cy5leHBvcnRBbGwgPSBmdW5jdGlvbiAoc291cmNlLCBkZXN0KSB7XG4gIE9iamVjdC5rZXlzKHNvdXJjZSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgaWYgKGtleSA9PT0gJ2RlZmF1bHQnIHx8IGtleSA9PT0gJ19fZXNNb2R1bGUnIHx8IGRlc3QuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShkZXN0LCBrZXksIHtcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHNvdXJjZVtrZXldO1xuICAgICAgfSxcbiAgICB9KTtcbiAgfSk7XG5cbiAgcmV0dXJuIGRlc3Q7XG59O1xuXG5leHBvcnRzLmV4cG9ydCA9IGZ1bmN0aW9uIChkZXN0LCBkZXN0TmFtZSwgZ2V0KSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShkZXN0LCBkZXN0TmFtZSwge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBnZXQsXG4gIH0pO1xufTtcbiIsImltcG9ydCB0eXBlIHsgUHJveHlDb25maWcgfSBmcm9tICcuL3R5cGVzJ1xuXG4vLyDlupTnlKjku6PnkIborr7nva5cbmV4cG9ydCBjb25zdCBhcHBseVByb3h5ID0gYXN5bmMgKGNvbmZpZzogUHJveHlDb25maWcpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgY29uc3QgcHJveHlDb25maWc6IGNocm9tZS5wcm94eS5Qcm94eUNvbmZpZyA9IHtcbiAgICBtb2RlOiAnZml4ZWRfc2VydmVycycsXG4gICAgcnVsZXM6IHtcbiAgICAgIHNpbmdsZVByb3h5OiB7XG4gICAgICAgIHNjaGVtZTogY29uZmlnLnR5cGUsXG4gICAgICAgIGhvc3Q6IGNvbmZpZy5ob3N0LFxuICAgICAgICBwb3J0OiBjb25maWcucG9ydFxuICAgICAgfSxcbiAgICAgIGJ5cGFzc0xpc3Q6IFsnbG9jYWxob3N0JywgJzEyNy4wLjAuMScsICc8bG9jYWw+J11cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNocm9tZS5wcm94eS5zZXR0aW5ncy5zZXQoXG4gICAgICB7IHZhbHVlOiBwcm94eUNvbmZpZywgc2NvcGU6ICdyZWd1bGFyJyB9LFxuICAgICAgKCkgPT4ge1xuICAgICAgICBpZiAoY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yKSB7XG4gICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihjaHJvbWUucnVudGltZS5sYXN0RXJyb3IubWVzc2FnZSkpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzb2x2ZSgpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApXG4gIH0pXG59XG5cbi8vIOWFs+mXreS7o+eQhlxuZXhwb3J0IGNvbnN0IGRpc2FibGVQcm94eSA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgY29uc3QgY29uZmlnOiBjaHJvbWUucHJveHkuUHJveHlDb25maWcgPSB7XG4gICAgbW9kZTogJ3N5c3RlbSdcbiAgfVxuXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY2hyb21lLnByb3h5LnNldHRpbmdzLnNldChcbiAgICAgIHsgdmFsdWU6IGNvbmZpZywgc2NvcGU6ICdyZWd1bGFyJyB9LFxuICAgICAgKCkgPT4ge1xuICAgICAgICBpZiAoY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yKSB7XG4gICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihjaHJvbWUucnVudGltZS5sYXN0RXJyb3IubWVzc2FnZSkpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzb2x2ZSgpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApXG4gIH0pXG59XG5cbi8vIOiuvue9ruaJqeWxleinkuagh1xuZXhwb3J0IGNvbnN0IHNldEJhZGdlID0gKHRleHQ6IHN0cmluZywgY29sb3I6IHN0cmluZyA9ICcjNENBRjUwJyk6IHZvaWQgPT4ge1xuICBjaHJvbWUuYWN0aW9uLnNldEJhZGdlVGV4dCh7IHRleHQgfSlcbiAgY2hyb21lLmFjdGlvbi5zZXRCYWRnZUJhY2tncm91bmRDb2xvcih7IGNvbG9yIH0pXG59XG5cbi8vIOa4hemZpOinkuagh1xuZXhwb3J0IGNvbnN0IGNsZWFyQmFkZ2UgPSAoKTogdm9pZCA9PiB7XG4gIGNocm9tZS5hY3Rpb24uc2V0QmFkZ2VUZXh0KHsgdGV4dDogJycgfSlcbn1cblxuLy8g5pi+56S66YCa55+lXG5leHBvcnQgY29uc3Qgc2hvd05vdGlmaWNhdGlvbiA9ICh0aXRsZTogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgY2hyb21lLm5vdGlmaWNhdGlvbnMuY3JlYXRlKHtcbiAgICB0eXBlOiAnYmFzaWMnLFxuICAgIGljb25Vcmw6ICdpY29uLnBuZycsXG4gICAgdGl0bGUsXG4gICAgbWVzc2FnZVxuICB9KVxufVxuXG4vLyDmo4Dmn6Xku6PnkIbov57mjqXnirbmgIFcbmV4cG9ydCBjb25zdCBjaGVja1Byb3h5Q29ubmVjdGlvbiA9IGFzeW5jIChjb25maWc6IFByb3h5Q29uZmlnKTogUHJvbWlzZTxib29sZWFuPiA9PiB7XG4gIHRyeSB7XG4gICAgLy8g6L+Z6YeM5Y+v5Lul5re75Yqg5a6e6ZmF55qE6L+e5o6l5rWL6K+V6YC76L6RXG4gICAgLy8g5q+U5aaC6YCa6L+HZmV0Y2jor7fmsYLmtYvor5Xku6PnkIbmmK/lkKblj6/nlKhcbiAgICByZXR1cm4gdHJ1ZVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ1Byb3h5IGNvbm5lY3Rpb24gdGVzdCBmYWlsZWQ6JywgZXJyb3IpXG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuLy8g6I635Y+W5b2T5YmN5Luj55CG6K6+572uXG5leHBvcnQgY29uc3QgZ2V0Q3VycmVudFByb3h5U2V0dGluZ3MgPSBhc3luYyAoKTogUHJvbWlzZTxjaHJvbWUucHJveHkuUHJveHlDb25maWc+ID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgY2hyb21lLnByb3h5LnNldHRpbmdzLmdldCh7fSwgKGRldGFpbHMpID0+IHtcbiAgICAgIHJlc29sdmUoZGV0YWlscy52YWx1ZSlcbiAgICB9KVxuICB9KVxufVxuIl0sIm5hbWVzIjpbXSwidmVyc2lvbiI6MywiZmlsZSI6ImluZGV4LmpzLm1hcCJ9
 globalThis.define=__define;  })(globalThis.define);