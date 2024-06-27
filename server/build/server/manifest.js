const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.lHraFrvv.js","app":"_app/immutable/entry/app.UhU661jj.js","imports":["_app/immutable/entry/start.lHraFrvv.js","_app/immutable/chunks/entry.CzKU0Ip0.js","_app/immutable/chunks/scheduler.BvLojk_z.js","_app/immutable/entry/app.UhU661jj.js","_app/immutable/chunks/scheduler.BvLojk_z.js","_app/immutable/chunks/index.CukP--xD.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./chunks/0-CabuiMXv.js')),
			__memo(() => import('./chunks/1-C-Uq7FEq.js')),
			__memo(() => import('./chunks/2-DxPFlcNL.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/create_qrcode",
				pattern: /^\/api\/create_qrcode\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-BcsbXjkt.js'))
			},
			{
				id: "/api/delete_qrcode",
				pattern: /^\/api\/delete_qrcode\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-Cu7fS4Ud.js'))
			},
			{
				id: "/api/get_content",
				pattern: /^\/api\/get_content\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-o8oVMtWA.js'))
			},
			{
				id: "/api/get_me",
				pattern: /^\/api\/get_me\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-BfPc-mvk.js'))
			},
			{
				id: "/api/get_mine_qrcodes",
				pattern: /^\/api\/get_mine_qrcodes\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-KICN92Bu.js'))
			},
			{
				id: "/api/get_qr_by_id",
				pattern: /^\/api\/get_qr_by_id\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-CO5o9Fpd.js'))
			},
			{
				id: "/api/get_qrcode",
				pattern: /^\/api\/get_qrcode\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-BiNyEN8c.js'))
			},
			{
				id: "/api/is_logged",
				pattern: /^\/api\/is_logged\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-lwK5sobN.js'))
			},
			{
				id: "/api/login",
				pattern: /^\/api\/login\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-CDH--n1m.js'))
			},
			{
				id: "/api/registrati",
				pattern: /^\/api\/registrati\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-DOh0qpSM.js'))
			},
			{
				id: "/api/update_qrcode",
				pattern: /^\/api\/update_qrcode\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-BzH7JA8C.js'))
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
