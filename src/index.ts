export default {
  async fetch(request, env) {
    const formdata = await request.formData()
    // const p = formdata.get('p') as string
    // const np = formdata.get('negative_prompt') as string
    // const w = formdata.get('width') as unknown as number
    // const h = formdata.get('height') as unknown as number
    // const num_steps = formdata.get('num_steps')
    // const img = formdata.get('img') as File
    // const mask = formdata.get('mask') as File
    const inputs: any = {};
    for (const [k, v] of formdata) {
      if(k === 'prompt' || k === 'negative_prompt') {
        if(v) {
          inputs[k] = v
        }
      } else if(k === 'width' || k === 'height') {
        let val = Number(v) as any
        if(val &&  Number.isInteger(val)) {
          inputs[k] = val
        }
      } else if(k === 'image' || k === 'mask') {
        if(v && typeof (v as unknown as File).arrayBuffer === 'function') {
          inputs[k] = [...new Uint8Array(await (v as any).arrayBuffer())]
        }
      } else if(k === 'num_steps') {
        let val = Number(v)
        if(Number.isInteger(val) && val > 0 && val <= 20) {
          inputs[k] = val
        }
      } else if(k === 'strength') {
        let val = Number(v)
        if(val > 0 && val <= 1) {
          inputs[k] = val
        }
      } else if(k === 'strength') {
        let val = Number(v)
        if(Number.isInteger(val)) {
          inputs[k] = val
        }
      }
    }

    const response = await env.AI.run(
      "@cf/stabilityai/stable-diffusion-xl-base-1.0",
      inputs,
    );

    return new Response(response, {
      headers: {
        "content-type": "image/png",
      },
    });
  },
} satisfies ExportedHandler<Env>;
