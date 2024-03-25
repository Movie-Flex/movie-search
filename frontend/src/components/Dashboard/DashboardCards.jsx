export default function DashBoardCards() {
  return (
    <div class="w-3/12 md:mx-2">
      <div class="bg-white p-3 border-t-4 border-green-400">
        <div class="image overflow-hidden">
          <img
            class="h-auto w-full mx-auto"
            src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
            alt=""
          />
        </div>
        <h1 class="text-gray-900 font-bold text-xl leading-8 my-1">Jane Doe</h1>
        <h3 class="text-gray-600 font-lg text-semibold leading-6">
          Owner at Her Company Inc.
        </h3>
        {/* <p class="text-sm text-gray-500 hover:text-gray-600 leading-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur non
          deserunt
        </p> */}
        <ul class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
          <li class="flex items-center py-3">
            <span>Status</span>
            <span class="ml-auto">
              <span class="bg-green-500 py-1 px-2 rounded text-white text-sm">
                Active
              </span>
            </span>
          </li>
          <li class="flex items-center py-3">
            <span>Joined On</span>
            <span class="ml-auto">Nov 07, 2016</span>
          </li>
        </ul>
      </div>

      <div class="my-4"></div>
    </div>
  );
}
