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
		client: {"start":"_app/immutable/entry/start.AL7Ljg1K.js","app":"_app/immutable/entry/app.CBGf87vF.js","imports":["_app/immutable/entry/start.AL7Ljg1K.js","_app/immutable/chunks/entry.DKRz3bzJ.js","_app/immutable/chunks/scheduler.BvLojk_z.js","_app/immutable/entry/app.CBGf87vF.js","_app/immutable/chunks/scheduler.BvLojk_z.js","_app/immutable/chunks/index.fi1e1Nz5.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./chunks/0-D0RzhiHk.js')),
			__memo(() => import('./chunks/1-TnJlszxh.js')),
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
				endpoint: __memo(() => import('./chunks/_server-DyamtCB3.js'))
			},
			{
				id: "/api/delete_qrcode",
				pattern: /^\/api\/delete_qrcode\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-Dz-By-1R.js'))
			},
			{
				id: "/api/get_content",
				pattern: /^\/api\/get_content\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-AWOum9Ee.js'))
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
				endpoint: __memo(() => import('./chunks/_server-BgzTx5mx.js'))
			},
			{
				id: "/api/get_qr_by_id",
				pattern: /^\/api\/get_qr_by_id\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-B7jIvgvT.js'))
			},
			{
				id: "/api/get_qrcode",
				pattern: /^\/api\/get_qrcode\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-DScwCgUI.js'))
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
				endpoint: __memo(() => import('./chunks/_server-DtxjAhvH.js'))
			},
			{
				id: "/api/update_qrcode",
				pattern: /^\/api\/update_qrcode\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-CnTIaymC.js'))
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
