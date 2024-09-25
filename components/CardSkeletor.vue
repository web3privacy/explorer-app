<template>
  <div
    flex
    w-full
    items-center
    gap-16px
    hover:bg="#121212"
    transition-all
    animate-pulse
  >
    <div
      grid
      grid-cols="2 lg:10"
      w-full
      gap-24px
      items-center
    >
      <div
        col-span="1 lg:2"
        flex
        items-center
        gap="12px lg:16px"
        relative
        w-full
        h-full
        h="48px lg:64px"
      >
        <div class="bg-app-text-grey w-64px h-64px " />
        <div
          flex
          flex-col
          gap-y-4px
          lg:flex-row
          justify-center
        >
          <div
            w-fit
            flex
            items-center
            gap-8px
          >
            <div class="bg-app-text-grey w-100px h-10px " />
          </div>
          <div
            class="bg-app-text-grey w-150px h-10px lg:hidden"
            lg:animate-none
            animate-pulse
          />
        </div>
      </div>

      <div
        lg:col-span-2
        flex
        items-center
        justify-end
        w-full
        gap-16px
      >
        <div
          class="bg-app-text-grey lg:w-full w-80px h-10px "
        />
      </div>
      <div
        class="bg-app-text-grey w-full h-10px "
        lg:block
        hidden
      />
      <div
        class="bg-app-text-grey w-full h-10px "
        lg:block
        hidden
      />
      <div
        class="bg-app-text-grey w-full h-10px "
        lg:block
        hidden
      />
      <div
        class="bg-app-text-grey w-10px h-10px  "
        lg:block
        hidden
      />
      <div
        class="bg-app-text-grey w-80px h-16px "
        lg:block
        hidden
      />
      <div
        class="bg-app-text-grey w-50px ml-auto h-32px "
        lg:block
        hidden
      />
    </div>
  </div>
</template>
