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
		client: {"start":"_app/immutable/entry/start.C7GNOAxD.js","app":"_app/immutable/entry/app.BCXH4-8q.js","imports":["_app/immutable/entry/start.C7GNOAxD.js","_app/immutable/chunks/entry.DydSOSTV.js","_app/immutable/chunks/scheduler.BvLojk_z.js","_app/immutable/entry/app.BCXH4-8q.js","_app/immutable/chunks/scheduler.BvLojk_z.js","_app/immutable/chunks/index.fi1e1Nz5.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./chunks/0-D0RzhiHk.js')),
			__memo(() => import('./chunks/1-SJ6hyq_l.js')),
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
				endpoint: __memo(() => import('./chunks/_server-DwBNsnj-.js'))
			},
			{
				id: "/api/delete_qrcode",
				pattern: /^\/api\/delete_qrcode\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-Dm6-xPMW.js'))
			},
			{
				id: "/api/get_me",
				pattern: /^\/api\/get_me\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-DfnZh28u.js'))
			},
			{
				id: "/api/get_mine_qrcodes",
				pattern: /^\/api\/get_mine_qrcodes\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-RwjkNVUa.js'))
			},
			{
				id: "/api/get_qr_by_id",
				pattern: /^\/api\/get_qr_by_id\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-Byq4RlKW.js'))
			},
			{
				id: "/api/is_logged",
				pattern: /^\/api\/is_logged\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-CGDd2lB-.js'))
			},
			{
				id: "/api/login",
				pattern: /^\/api\/login\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-Bhzi5AKx.js'))
			},
			{
				id: "/api/update_qrcode",
				pattern: /^\/api\/update_qrcode\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-CjTIagis.js'))
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
