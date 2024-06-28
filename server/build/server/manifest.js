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
		client: {"start":"_app/immutable/entry/start.Dubq6Xjn.js","app":"_app/immutable/entry/app.Dc3NZ8Ga.js","imports":["_app/immutable/entry/start.Dubq6Xjn.js","_app/immutable/chunks/entry.DdkiE7so.js","_app/immutable/chunks/scheduler.BvLojk_z.js","_app/immutable/entry/app.Dc3NZ8Ga.js","_app/immutable/chunks/scheduler.BvLojk_z.js","_app/immutable/chunks/index.CukP--xD.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./chunks/0-CabuiMXv.js')),
			__memo(() => import('./chunks/1-D2Cc1Lpq.js')),
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
				endpoint: __memo(() => import('./chunks/_server-ec5-PC8l.js'))
			},
			{
				id: "/api/delete_qrcode",
				pattern: /^\/api\/delete_qrcode\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-BI7wb9lw.js'))
			},
			{
				id: "/api/get_content",
				pattern: /^\/api\/get_content\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-CF9knUPm.js'))
			},
			{
				id: "/api/get_me",
				pattern: /^\/api\/get_me\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-ITU-d2Gc.js'))
			},
			{
				id: "/api/get_mine_qrcodes",
				pattern: /^\/api\/get_mine_qrcodes\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-CKEVJXyQ.js'))
			},
			{
				id: "/api/get_qr_by_id",
				pattern: /^\/api\/get_qr_by_id\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-DpUaOu5c.js'))
			},
			{
				id: "/api/get_qrcode",
				pattern: /^\/api\/get_qrcode\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-BPfIgKGd.js'))
			},
			{
				id: "/api/is_logged",
				pattern: /^\/api\/is_logged\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-4VoUF0av.js'))
			},
			{
				id: "/api/login",
				pattern: /^\/api\/login\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-D4iX1tZv.js'))
			},
			{
				id: "/api/registrati",
				pattern: /^\/api\/registrati\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-DvgjmGOM.js'))
			},
			{
				id: "/api/update_qrcode",
				pattern: /^\/api\/update_qrcode\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-DA6PzTCr.js'))
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
