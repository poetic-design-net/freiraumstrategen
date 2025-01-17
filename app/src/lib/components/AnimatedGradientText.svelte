<script lang="ts">
    import { cn } from "$lib/utils";
  
    let className: any = "";
    export { className as class };
    let colorClass: string = "";
    export let text: string = "Gradient";
</script>
  
<button
  class={cn(
    "group relative flex max-w-fit flex-row items-center justify-start rounded-2xl px-4 py-1.5 text-sm font-regular shadow-[inset_0_-8px_10px_#8fe3eb1f] backdrop-blur-sm transition-shadow duration-500 ease-out [--bg-size:300%] hover:shadow-[inset_0_-5px_10px_#8fe3eb3f] bg-transparent",
    className
  )}
>
  <div
    class={cn(
      "absolute inset-0 block h-full w-full animate-gradient bg-gradient-to-r from-[#002c33]/50 via-[#0b8695]/50 to-[#002c33]/50 bg-[length:var(--bg-size)_100%] p-[1px] ![mask-composite:subtract] [border-radius:inherit] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]",
      colorClass
    )}
  />

  <slot>{text}</slot>
</button>
