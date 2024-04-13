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
		client: {"start":"_app/immutable/entry/start.BcbAEh9W.js","app":"_app/immutable/entry/app.BqQwdKLN.js","imports":["_app/immutable/entry/start.BcbAEh9W.js","_app/immutable/chunks/entry.DpJcbMEN.js","_app/immutable/chunks/scheduler.BvLojk_z.js","_app/immutable/entry/app.BqQwdKLN.js","_app/immutable/chunks/scheduler.BvLojk_z.js","_app/immutable/chunks/index.fi1e1Nz5.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./chunks/0-D0RzhiHk.js')),
			__memo(() => import('./chunks/1-CulvO38r.js')),
			__memo(() => import('./chunks/2-CuBxPdHM.js'))
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
				endpoint: __memo(() => import('./chunks/_server-wvL3YJ9C.js'))
			},
			{
				id: "/api/delete_qrcode",
				pattern: /^\/api\/delete_qrcode\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-B3g-jr8H.js'))
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
				endpoint: __memo(() => import('./chunks/_server-DNN4otZC.js'))
			},
			{
				id: "/api/get_qr_by_id",
				pattern: /^\/api\/get_qr_by_id\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-B9HQnqdi.js'))
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
				endpoint: __memo(() => import('./chunks/_server-CARg0PYO.js'))
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
				endpoint: __memo(() => import('./chunks/_server-BnlnB5ea.js'))
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
