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
		client: {"start":"_app/immutable/entry/start.COiW1Uch.js","app":"_app/immutable/entry/app.g2gdyPZa.js","imports":["_app/immutable/entry/start.COiW1Uch.js","_app/immutable/chunks/entry.D90hmsbt.js","_app/immutable/chunks/scheduler.BvLojk_z.js","_app/immutable/entry/app.g2gdyPZa.js","_app/immutable/chunks/scheduler.BvLojk_z.js","_app/immutable/chunks/index.fi1e1Nz5.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./chunks/0-D0RzhiHk.js')),
			__memo(() => import('./chunks/1-Bv0lh2Cn.js')),
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
				endpoint: __memo(() => import('./chunks/_server-DRklNcM_.js'))
			},
			{
				id: "/api/get_me",
				pattern: /^\/api\/get_me\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-Cc3I1w_Y.js'))
			},
			{
				id: "/api/get_mine_qrcodes",
				pattern: /^\/api\/get_mine_qrcodes\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-C0hBIpCw.js'))
			},
			{
				id: "/api/get_qr_by_id",
				pattern: /^\/api\/get_qr_by_id\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-BjpeFc0n.js'))
			},
			{
				id: "/api/is_logged",
				pattern: /^\/api\/is_logged\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-BjOt8hQM.js'))
			},
			{
				id: "/api/login",
				pattern: /^\/api\/login\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-CuiZUJek.js'))
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
