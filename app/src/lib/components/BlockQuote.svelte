<script lang="ts">
  export let children: any;
</script>

<blockquote>
  {children}
</blockquote>

<style>
  blockquote {
    border-left: 5px solid var(--black);
    padding-left: var(--space-3);
    margin-left: var(--space-4);
  }
</style>