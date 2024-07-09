import * as React from "react";
const SvgEmpty = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 624 638"
    {...props}
  >
    <path d="M172.698 2.646c-.578 2.31.722 12.276 1.95 15.02.505 1.01 1.227 1.805 1.661 1.66 1.083-.36.866-14.947-.217-16.969-1.155-2.166-2.816-2.022-3.394.289ZM156.741 12.036c.65 3.755 10.254 16.175 12.565 16.175 1.516 0 1.083-1.372-2.311-7.149-5.993-10.254-11.193-14.803-10.254-9.026ZM197.25 12.612c-3.827 1.661-9.531 9.532-8.015 11.049 1.733 1.733 12.348-7.15 11.915-10.038-.289-1.95-1.156-2.166-3.9-1.01ZM176.382 41.429c-3.177 4.91-3.25 20.869-.072 31.773 4.694 16.03 12.492 26.213 27.657 36.178.072.072-.361 2.094-1.083 4.405-.867 3.177-1.156 7.149-1.156 15.164 0 12.854 1.661 20.797 6.066 29.607l2.816 5.56-3.683 4.405c-7.148 8.882-14.586 27.368-18.197 45.421-2.888 14.226-3.538 20.364-3.538 33.362l-.072 12.204-5.2 5.632c-4.982 5.416-10.398 12.854-10.398 14.226 0 .361-1.444 1.228-3.105 1.877-4.116 1.517-8.666 5.488-11.049 9.46-.938 1.733-3.394 7.655-5.271 13.143-4.549 12.998-6.355 16.897-12.059 26.285-6.644 10.831-7.944 17.258-1.95 9.387 1.516-2.022 2.888-3.61 3.105-3.61.217-.073.794.938 1.3 2.094 4.982 11.12 21.663 23.107 32.278 23.107 5.055 0 6.499-5.777 2.961-11.842-1.733-2.961-4.26-4.766-5.271-3.755-.217.216.433 2.383 1.516 4.838 1.083 2.383 1.878 4.477 1.733 4.621-.144.145-2.238-2.31-4.766-5.488-2.527-3.105-6.282-7.076-8.449-8.809-2.166-1.661-3.899-3.394-3.899-3.755-.072-1.589 3.394-4.55 7.51-6.572 3.827-1.805 4.983-2.022 10.11-1.877 13.575.505 29.245-5.199 45.276-16.464 15.309-10.832 37.767-35.673 39.356-43.544.433-2.166.361-2.239-.867-1.228-.722.578-3.755 4.333-6.716 8.305-6.715 8.954-22.891 25.129-31.556 31.628-3.538 2.672-10.399 6.788-15.165 9.171-9.17 4.55-16.392 6.788-24.84 7.655l-5.2.505.795-1.95c.939-2.527.939-6.21-.072-10.254-1.3-5.127-3.539-3.899-3.539 1.95 0 5.56-3.827 10.543-10.615 13.937-3.755 1.877-7.293 6.066-10.615 12.493-.65 1.299-1.444 2.382-1.733 2.382-.794 0-3.755-5.271-5.344-9.243l-1.155-3.032 3.466-6.861c1.95-3.755 4.549-10.037 5.849-13.864 3.539-10.832 7.005-18.414 9.532-21.014 4.116-4.332 10.832-7.004 23.18-9.171 3.538-.577 6.571-1.083 6.86-1.083 1.083.072-2.238 1.661-8.376 4.044-9.027 3.538-9.027 5.344.144 5.344 5.127 0 13.431 2.238 14.876 4.116.938 1.083.794 1.155-.795.65-1.011-.217-5.921-.65-10.904-.939-6.788-.289-9.243-.217-9.676.433-.722 1.228 1.444 2.744 5.705 4.044 5.921 1.805 16.536 8.377 15.381 9.532-.217.144-2.455-.506-4.983-1.589-8.088-3.394-12.059-4.693-14.298-4.693-3.899 0-2.094 1.733 4.405 4.188 1.011.433 3.9 2.094 6.427 3.683 5.199 3.394 9.46 3.971 12.348 1.588 1.517-1.227 1.589-1.516.722-3.538-.505-1.228-2.094-3.105-3.538-4.188-2.744-2.167-2.6-2.456 2.166-3.467 2.167-.505 4.189-2.238 4.189-3.682 0-1.661-3.683-4.55-8.377-6.572l-4.477-1.877 2.961-2.311c2.671-2.022 3.032-2.672 3.032-5.199v-2.816l-4.188-.217c-3.683-.217-14.514 1.372-17.475 2.527-1.805.65 1.444-4.332 5.199-8.087 4.55-4.477 7.799-5.849 18.27-7.655 8.521-1.444 10.47-1.516 34.661-1.011 14.082.217 26.213.217 26.935 0 1.805-.722 1.517-2.455-.578-3.249-2.888-1.083-58.852-1.805-65.64-.794-3.177.433-5.777.722-5.849.649-.144-.144.072-6.138.361-13.286.939-21.014 4.838-39.572 11.554-55.748 3.033-7.221 8.304-16.247 10.759-18.486 1.373-1.228 1.517-1.155 5.633 3.033 8.738 8.954 17.62 13.142 28.379 13.576 7.438.289 7.438.289-3.61-2.672-7.799-2.094-13.937-5.777-20.509-12.348-6.354-6.355-6.354-6.644-.577-9.099 5.704-2.455 8.232-2.6 13.792-.939 11.193 3.394 19.858 13.504 25.852 30.257 3.683 10.254 6.138 21.158 6.21 27.874l.145 5.849-9.749-.217c-6.86-.217-10.398 0-11.915.65-2.022.867-1.589 1.011 5.777 1.444 4.405.217 9.965.506 12.493.578 2.527 0 4.477.361 4.477.794 0 .506-6.499.722-19.497.65-14.515-.072-19.786.145-20.581.794-1.661 1.373-.65 2.095 2.167 1.661 2.816-.433 3.105-.144 1.372 1.517-.722.794-2.456 1.155-4.839 1.155-4.188 0-9.17 1.156-9.17 2.167 0 1.299 1.444 1.444 6.282.794 6.138-.939 44.266-1.589 44.266-.794 0 .288-9.027.722-20.003.866-15.381.217-20.508.506-21.88 1.228-1.083.65-1.444 1.155-.867 1.372 2.672.866-.216 1.444-9.026 1.733-10.182.361-14.876 1.372-13.431 2.816.577.578 2.96.578 8.087 0 4.044-.433 13.071-.794 20.147-.867 7.005 0 18.342-.288 25.058-.577 6.788-.289 12.348-.433 12.492-.361.145.072-.288 3.827-.866 8.304-.65 4.477-1.011 8.304-.794 8.449.216.216 1.155-1.372 2.094-3.539 2.888-6.426 4.044-13.792 4.044-26.429 0-23.541-4.766-41.522-15.02-56.614-4.117-6.138-9.966-11.843-14.515-14.081-1.733-.867-2.744-1.805-2.383-2.022.433-.289 13.07-.794 28.09-1.155 25.058-.578 34.156-1.3 31.268-2.383-2.383-.867-28.09-1.156-45.132-.506-22.819.939-29.968 1.95-36.828 5.344-2.889 1.444-5.416 2.599-5.633 2.599-.866 0-5.56-11.77-6.715-16.969-1.806-7.799-1.878-22.891-.073-28.668l1.228-4.044 3.899 1.372c8.377 2.888 15.454 2.455 19.931-1.228 8.665-7.293 3.683-19.064-8.016-19.064-2.022 0-4.838.578-6.282 1.228-2.744 1.3-7.438 5.633-9.965 9.171l-1.444 2.166-3.467-2.383c-7.654-5.271-14.009-12.926-18.125-21.952-3.971-8.81-4.838-13.215-5.199-27.802-.217-7.22-.65-13.142-1.011-13.142-.361 0-1.083.722-1.733 1.66Zm49.97 55.458c5.416 2.022 6.716 6.211 3.178 10.182-2.094 2.311-2.239 2.383-8.16 2.383-4.044-.072-6.933-.433-8.81-1.3l-2.744-1.227 1.228-1.95c2.021-3.249 4.91-5.993 7.582-7.438 2.888-1.588 4.838-1.733 7.726-.65Zm42.677 143.774c-.288.722-4.766 1.01-18.702 1.155-10.11.072-19.136-.072-20.147-.361-1.011-.361 6.643-.722 17.691-.939 10.76-.217 19.931-.505 20.436-.578.578-.072.867.289.722.723Z" />
    <path d="M99.188 87.067c-16.03 3.322-33.217 12.276-48.02 25.057-22.314 19.209-38.49 49.826-45.927 86.871-6.86 34.084-6.716 75.533.36 95.969 3.973 11.698 10.472 18.053 18.415 18.053 7.149 0 12.565-4.694 19.28-16.464 4.91-8.594 6.716-10.904 9.243-11.988 4.91-2.021 7.727 1.156 9.316 10.832 2.094 11.987 3.538 15.887 7.293 19.064 1.733 1.444 3.105 1.878 5.488 1.878 4.333 0 6.427-1.228 10.615-6.066 4.405-5.127 7.438-5.994 10.615-2.961 1.156 1.083 2.528 3.611 3.25 5.994 3.105 10.615 5.56 14.442 10.037 16.103l2.311.866-1.661 7.655c-7.799 37.117-.505 66.001 19.136 75.678 5.055 2.527 5.922 2.744 11.698 2.744 5.272-.073 6.788-.361 10.399-2.167 5.632-2.672 12.204-9.387 16.248-16.608 5.632-9.821 11.265-26.863 10.759-32.64l-.217-2.744-1.516 2.888c-.867 1.589-2.744 6.427-4.261 10.832-8.448 24.985-18.413 36.611-31.339 36.539-9.749 0-18.631-6.354-23.83-17.114-3.972-8.16-5.272-14.442-5.633-27.368-.577-17.692 2.311-33.651 10.11-56.325 7.293-21.086 15.237-37.189 33.578-68.24 9.604-16.175 12.349-22.602 12.926-29.968.506-6.716-.939-11.626-5.199-17.619-1.805-2.6-3.25-4.405-3.25-3.972 0 .361.506 3.755 1.084 7.51 1.444 9.243 1.372 12.709-.434 18.414-2.888 9.46-10.254 14.731-21.374 15.381-9.965.578-21.808-3.177-31.846-10.11-5.127-3.538-14.225-12.565-18.847-18.703-4.766-6.21-11.265-18.63-14.153-26.718-2.744-7.871-2.094-10.037 5.704-17.619 4.839-4.766 7.222-6.499 13.432-9.605 4.188-2.094 9.748-4.332 12.348-4.982 4.549-1.156 4.983-1.156 9.676.144 3.033.795 6.86 2.6 10.11 4.766 6.932 4.622 17.908 16.248 22.819 23.974 2.166 3.467 4.116 6.283 4.477 6.283.866 0 .578-4.261-.578-7.005-.577-1.372-2.527-4.621-4.332-7.149-5.488-7.726-3.972-13.07 3.899-13.864 3.25-.289 3.827-.145 5.777 1.805 1.155 1.228 2.6 3.827 3.249 5.994 1.011 3.538 1.084 4.332.073 7.582-.578 2.166-1.95 4.549-3.25 5.777-1.3 1.227-2.599 2.744-3.033 3.538-.65 1.228-.505 1.3 1.3.867 1.95-.434 2.022-.361.722.577-.722.65-1.733 1.228-2.166 1.372-.433.145-.578.506-.361.795.866.938 9.604-4.261 13.287-7.871 6.643-6.644 9.748-15.02 9.748-26.43 0-26.068-20.075-51.487-46.576-58.852-5.922-1.661-24.191-2.022-30.979-.65ZM81.496 202.244l4.766 7.221H82.94c-6.138 0-11.77-4.043-12.781-9.098-.578-2.816 1.589-5.344 4.622-5.344 1.66 0 2.6 1.011 6.715 7.221ZM8.49 284.565c1.878 4.766 5.922 11.554 8.882 14.948 4.26 4.838 10.616 6.572 15.31 4.116l2.166-1.083-2.167 2.239c-7.293 7.726-15.958 5.055-21.519-6.644-2.455-5.127-6.066-19.352-4.55-17.836.145.144 1.012 2.094 1.878 4.26Zm65.857 23.758c1.733.794 3.828 1.517 4.55 1.517 1.227 0 1.227.072 0 1.444-1.445 1.588-4.694 1.877-6.933.722-1.588-.939-3.9-5.127-4.621-8.665l-.506-2.528 2.167 2.961c1.227 1.661 3.61 3.683 5.343 4.549ZM329.613 139.778c-1.877 1.877-1.516 3.033.795 2.672 2.672-.361 6.138 3.466 7.654 8.521 1.661 5.56 2.744 15.02 2.239 18.919-.939 6.644-2.672 4.91-3.9-4.116-1.011-6.86-2.744-11.915-4.044-11.915-1.66 0-1.733.939-.288 6.138.722 2.744 1.372 6.138 1.372 7.582 0 3.611 1.155 7.221 3.032 9.171 1.878 2.022 3.539 2.094 5.2.289 1.227-1.372 1.3-1.372 2.744.072.938.939 2.022 1.3 3.321 1.083 1.084-.216 2.239.073 2.817.65 2.672 2.672 6.715-.433 8.232-6.282.65-2.455 1.3-3.538 2.094-3.538 2.022 0 3.033-4.766 2.094-9.821-.433-2.311-1.227-5.272-1.733-6.571-1.228-2.817-4.333-5.055-5.632-3.972-.578.505-1.3.505-1.95.144-.578-.433-1.733-.722-2.528-.722-.866 0-2.094-1.083-3.105-2.527-2.166-3.394-6.138-5.344-8.232-4.044-1.227.794-1.661.722-3.033-.578-2.238-2.094-5.704-2.672-7.149-1.155Zm13.865 5.849c3.177 2.672 4.694 8.232 4.694 17.764.072 4.188-.217 7.943-.506 8.304-1.372 1.372-3.394-2.816-3.394-7.004 0-5.127-1.877-14.587-3.61-18.27-1.589-3.249-.506-3.61 2.816-.794Zm9.387 5.994c1.878 1.877 2.456 7.004 1.517 13.936-1.228 8.955-2.094 9.316-2.166.939 0-3.972-.434-9.243-1.011-11.77-.939-4.694-.578-5.344 1.66-3.105Zm6.933 6.138c.577 1.949 1.083 4.404 1.083 5.415 0 1.661-.072 1.733-1.155.65-.65-.577-1.372-3.177-1.733-5.849-.289-2.599-.795-5.127-1.084-5.705-.216-.505.073-.288.722.506.578.794 1.589 3.033 2.167 4.983ZM320.589 145.122c-1.372 1.661-4.404 3.899-7.871 5.705-7.293 3.755-8.232 4.838-8.015 8.882.144 1.733.505 3.394.939 3.683 2.094 1.588 8.737-.723 15.742-5.416 3.033-2.022 4.982-4.983 3.971-5.994-.216-.144-2.96 1.011-6.065 2.6-3.178 1.661-7.005 3.177-8.594 3.394-2.671.433-2.816.361-1.877-.795.578-.722 2.527-2.022 4.333-2.96 4.982-2.528 9.315-5.922 10.904-8.449 2.599-4.261-.145-4.838-3.467-.65Z" />
    <path d="M112.763 151.403c-5.777 2.816-10.326 11.12-6.066 11.12.722 0 1.661-.938 2.167-2.166 1.155-2.744 4.621-5.705 7.293-6.282 1.155-.217 2.455-.795 2.888-1.372 1.95-2.383-2.238-3.322-6.282-1.3ZM365.578 156.674c-.505.867 2.672 4.188 6.933 7.077 11.987 8.232 20.508 24.624 26.285 50.404 1.588 7.004 2.022 11.481 2.527 23.468.289 8.16.506 14.804.433 14.876 0 0-2.96.361-6.571.866-3.538.434-10.037 1.3-14.442 1.878-21.303 2.816-37.406 3.611-72.212 3.466-33.217-.144-37.911 0-37.911 1.372 0 2.094 16.537 6.427 24.624 6.427h3.683l-.505 4.838c-1.011 9.604-6.355 24.335-12.71 35.095-2.888 4.91-11.192 14.298-15.092 17.114-1.805 1.3-1.877 1.3-6.499-1.589-11.409-6.932-22.963-11.409-29.462-11.409-4.044 0-6.21 1.011-4.477 2.166.577.361 2.31.722 3.899.722 7.293 0 31.99 11.626 31.051 14.587-.289.939 0 1.3 1.011 1.3 1.3 0 1.011.65-1.805 4.838-16.464 24.552-34.012 89.326-39.861 147.528-2.816 27.513-3.611 52.643-2.239 70.768.867 11.626 2.167 21.663 3.033 23.324 2.094 4.044 28.596 10.471 49.61 12.059 5.343.361 9.748.795 9.748.867.506.866 2.167 7.943 2.383 10.037.289 2.311 0 2.889-2.961 5.488-1.877 1.661-9.531 6.138-17.114 10.038-7.582 3.971-14.37 7.871-15.02 8.665-1.011 1.3-2.744 1.805-9.171 2.672-9.748 1.372-14.37 2.455-15.453 3.755-.65.794 2.455.939 19.642.65 27.946-.506 47.443-1.444 49.97-2.383 1.733-.722 1.878-1.011 1.083-1.95-.722-.939-2.166-1.011-8.521-.65l-7.654.434 3.972-1.734c5.993-2.599 10.904-5.199 13.72-7.365l2.527-1.878.433 4.766c.434 4.766 1.3 6.716 2.744 5.849 1.589-1.01.723-29.101-1.083-36.322-.361-1.228-.072-1.661 1.3-1.95 10.182-2.094 16.175-3.682 19.858-5.416l4.405-2.094.433 10.182c.217 5.633.578 14.876.723 20.508l.361 10.254-3.828 2.094c-4.621 2.672-11.698 8.955-13.142 11.915-1.805 3.322-.722 3.755 7.077 2.817 3.682-.434 13.359-1.011 21.519-1.228 8.16-.217 16.247-.578 18.053-.794 6.499-.867.794-1.806-13.576-2.311-14.876-.506-16.753-.939-16.753-3.755 0-1.589 4.405-5.56 7.871-7.077 1.733-.794 4.694-1.155 9.098-1.155 7.438 0 9.966.866 18.487 6.427 3.827 2.455 5.704 3.249 7.365 3.105l2.239-.217-2.383-2.383c-3.539-3.538-12.493-8.521-17.909-9.965-4.549-1.228-4.693-1.3-4.26-3.322.216-1.155-.217-9.676-1.011-18.847-3.827-46.288-4.549-70.551-4.477-156.627v-71.995l2.672-7.799c2.888-8.448 4.477-11.842 9.604-20.941 2.96-5.271 3.682-6.066 5.849-6.427 4.26-.866 43.255.289 62.535 1.805 27.368 2.095 41.594 2.528 55.386 1.589 18.414-1.227 33.001-4.044 44.627-8.593 5.777-2.239 6.643-2.961 10.543-8.738 2.672-4.044 3.394-4.621 5.488-4.766 1.3-.072 11.554-.361 22.747-.722 15.02-.433 20.652-.794 21.158-1.516 1.227-1.372-.361-1.95-6.572-2.311l-5.56-.289 3.033-3.827c1.733-2.022 4.116-6.21 5.344-9.171 5.849-13.937 8.737-34.445 5.632-39.427-.866-1.445-3.827-1.011-5.993.866-2.528 2.167-7.366 11.337-13.215 25.202-2.816 6.716-5.055 11.048-6.066 11.626-.794.578-4.694 1.228-8.665 1.516-6.716.434-7.077.362-6.572-.866.217-.722 1.156-4.549 1.95-8.521 2.672-12.926 1.95-36.972-1.227-41.305-.867-1.228-1.011-1.155-1.517.794-.289 1.156-.289 6.499-.072 11.915.939 22.386-2.961 40.655-11.915 55.386-2.816 4.766-6.066 8.738-6.571 8.233-.217-.217 1.083-4.405 2.888-9.388 10.038-27.729 12.493-51.992 7.005-70.551-.434-1.516-.289-1.588 2.238-.866 1.95.578 2.961.505 3.466 0 4.983-4.983-26.934-10.904-52.931-9.965-18.702.722-41.593 4.477-65.351 10.615-12.854 3.321-16.392 4.549-19.064 6.427l-1.95 1.444.289-10.11c.578-16.825-1.95-32.567-7.726-48.093-5.85-15.886-14.948-28.162-24.119-32.35-3.9-1.878-6.644-2.239-7.366-1.156Zm219.596 110.267c-.867 10.832-4.766 23.325-10.904 35.312l-2.6 5.054-13.503.362c-7.438.216-13.576.288-13.721.288-.144-.072.578-1.299 1.589-2.816 1.011-1.444 2.022-3.249 2.239-3.899.361-1.083 1.516-1.445 6.86-1.806 3.538-.288 7.293-.794 8.448-1.083 2.744-.722 4.911-4.405 11.338-19.28 5.488-12.782 8.521-18.342 9.965-18.342.577 0 .65 1.805.289 6.21Zm-243.498 52.642c0 27.369-.144 81.527-.216 120.233-.145 69.828.361 95.608 2.455 128.897 1.155 17.981 2.888 36.684 3.971 42.894.434 2.166.723 4.188.723 4.549 0 .289-1.228.578-2.672.578-1.517 0-4.694.505-7.077 1.083s-4.477 1.011-4.694 1.083c-.216 0-.433-9.315-.433-20.797-.072-11.409-.505-29.823-.939-40.944-2.599-63.185-4.838-110.772-7.293-155.977-.794-14.731-2.455-49.609-3.611-77.627-1.155-28.018-2.383-51.631-2.599-52.57l-.434-1.661 11.41.217 11.482.216-.073 49.826Zm-82.321 36.539c-9.315 30.185-17.042 64.991-21.519 97.053-3.538 25.057-4.333 37.261-4.405 64.629 0 25.346.506 34.445 2.961 50.837.578 3.899.866 7.293.722 7.438-.506.505-6.788-1.95-7.582-2.961-.361-.433-1.3-5.56-1.95-11.265-1.733-14.081-1.733-49.609 0-68.601 4.044-44.41 10.76-79.071 22.458-115.538 2.888-8.882 11.193-30.546 11.626-30.113.144.145-.867 3.972-2.311 8.521Zm41.883 235.121c.289.65.722 5.344.939 10.471.361 7.799.288 9.243-.578 9.243-.578 0-3.683 1.661-6.788 3.611-3.177 2.022-8.232 4.621-11.265 5.777-9.026 3.466-25.202 6.21-26.863 4.549-.289-.217 2.311-1.95 5.777-3.827 14.443-7.583 21.591-11.915 24.841-15.165 3.972-3.755 4.26-5.271 2.455-11.265-.577-1.95-1.083-3.61-1.083-3.683 0-.072 2.527-.288 5.633-.433 3.032-.072 5.776-.289 5.993-.361.289-.072.722.433.939 1.083ZM117.17 163.824c-3.466 1.661-5.633 3.899-5.271 5.633.361 1.949 1.588 1.949 3.827-.073 3.683-3.466 8.015-4.116 5.777-.866-1.589 2.311-1.3 5.199.794 7.726 2.455 2.889 5.777 2.817 7.438-.072 1.444-2.599.144-7.077-3.033-10.47-2.889-3.106-5.705-3.611-9.532-1.878ZM89.584 171.264c-3.322 1.661-8.16 6.499-8.16 8.232 0 1.95 2.527 1.155 5.416-1.805 3.755-3.828 8.015-5.489 11.41-4.405 1.443.505 2.96 1.372 3.393 1.949.722.795.578 1.011-.794 1.011-2.383.072-7.221 2.383-8.882 4.261-1.3 1.444-1.372 1.661-.217 2.744 1.083 1.083 1.3 1.083 2.528 0 1.733-1.589 6.571-3.539 7.365-3.033.433.289.217 1.155-.433 2.166-1.444 2.239-.867 4.911 1.516 7.294 2.022 1.949 4.116 2.238 5.705.65 1.372-1.372 1.589-.578 2.239 6.499.722 8.448 1.083 10.037 2.021 9.098 1.228-1.227.939-11.77-.505-17.403-1.228-4.838-3.899-10.543-6.355-13.72-3.827-4.91-10.543-6.355-16.247-3.538ZM307.447 183.824c-1.806 2.167 0 2.528 13.287 2.528 12.203 0 17.764-.65 17.764-2.095 0-.649-14.154-1.516-23.83-1.516-4.622 0-6.571.289-7.221 1.083ZM132.333 204.402c-1.805 1.589-3.972 3.25-4.766 3.611-1.805 1.011-1.805 3.61 0 3.61.794 0 2.888-1.155 4.694-2.527 2.238-1.661 3.466-2.239 3.61-1.661.939 3.033 1.011 4.838.217 5.921-.722 1.011-1.228 1.084-3.25.362-1.805-.65-2.599-.65-3.249 0-2.383 2.383 4.188 5.343 7.871 3.538 3.322-1.589 3.683-6.86 1.083-13.793-1.011-2.671-2.311-2.455-6.21.939ZM602.286 228.088c-1.661 1.733-3.25 5.344-4.983 11.554-.433 1.517.578 5.272 1.372 4.983.361-.072 1.156-1.517 1.589-3.105.505-1.517 1.877-4.911 3.177-7.51 1.228-2.6 2.239-5.272 2.239-5.922 0-2.094-1.228-2.094-3.394 0ZM613.982 246.935c-4.766 1.156-7.004 3.611-4.26 4.694 1.372.506 10.759-.794 12.637-1.733 1.083-.65 1.228-1.083.65-2.166-.794-1.517-4.549-1.878-9.027-.795ZM173.637 305.792c-.506 1.299.072 1.877 1.805 1.877 2.167 0 8.232 3.394 10.976 6.138 2.817 2.816 4.044 3.177 4.044 1.228 0-5.055-15.236-13.432-16.825-9.243ZM139.555 356.554c4.766 7.51 9.893 12.493 12.926 12.493 1.805 0 1.372-1.805-.722-2.961-1.083-.505-4.116-3.322-6.788-6.21-4.983-5.344-7.799-7.077-5.416-3.322Z" />
  </svg>
);

const SvgEntry = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentcolor"
    viewBox="0 0 750 668"
    {...props}
  >
    <path d="M385.182.99c-.251.755-.503 2.265-.503 3.44 0 2.013-.084 2.097-1.427.923-3.188-2.685-3.775-2.685-2.433 0 1.762 3.44 1.762 3.524-.923 3.524-1.342 0-2.936.419-3.607.839-.923.587-.336.923 2.265 1.342l3.524.503-1.259 2.518c-1.678 3.188-1.174 3.691 1.594 1.51l2.182-1.678.252 3.104c.335 3.944 1.846 4.195 2.181.42.336-3.02.42-3.105 2.853-1.762 2.097 1.174 2.769.503 1.594-1.595-.839-1.51-.671-1.761 1.342-2.013 3.44-.42 3.357-2.182-.167-2.853-2.769-.503-2.937-.671-1.678-1.93 1.342-1.51 1.762-4.279.587-4.279-.336 0-1.51.588-2.517 1.343-1.762 1.258-1.846 1.174-1.846-1.259 0-2.852-1.259-4.111-2.014-2.097ZM6.865 37.063c-.336.335-.588 1.342-.588 2.181 0 1.762-.923 1.93-2.349.504-1.259-1.259-1.342-.252-.168 1.93.755 1.342.588 1.594-1.174 1.594-2.685 0-3.608 1.51-1.175 1.845 1.426.168 1.846.756 1.762 2.182-.252 2.014.587 2.35 2.097.839.756-.755 1.007-.503 1.007 1.259 0 2.684 1.343 3.02 2.098.587.335-1.007 1.175-1.594 1.93-1.51.923.167 1.342-.252 1.174-1.091-.084-.84.588-1.594 1.678-1.93 1.93-.587 1.846-.671-.503-1.678-1.51-.671-2.014-1.342-1.426-1.678 1.678-1.09 1.09-3.188-.756-2.601-1.258.42-1.845.084-2.349-1.259-.335-.922-.923-1.51-1.258-1.174ZM64.677 68.615c-.671 1.09-2.433 4.95-3.86 8.642-1.426 3.692-7.467 17.452-13.424 30.625-23.996 53.278-27.52 62.172-26.514 67.458.336 1.678.923 2.852 1.427 2.601.42-.336.755-.168.755.335 0 .42.252 1.427.587 2.266.42 1.174.168 1.342-1.762.839-3.02-.755-2.181.587 2.014 3.272 4.195 2.601 11.998 5.118 21.144 6.712 7.886 1.343 9.565 1.091 11.662-1.51 1.175-1.51 1.678-1.594 3.776-.755 1.342.503 9.565 2.852 18.207 5.202 8.726 2.265 31.379 8.977 50.341 14.767 19.046 5.789 41.784 12.585 50.51 15.102 8.81 2.517 22.15 6.461 29.785 8.81 19.718 5.873 37.841 9.984 46.147 10.404l7.132.419-3.776-1.258c-2.097-.671-11.914-3.524-21.815-6.293-17.116-4.866-31.379-9.145-84.742-25.758-42.538-13.173-61.584-18.878-75.428-22.57-7.552-2.014-13.928-3.859-14.18-4.111-.252-.252 3.776-8.81 8.894-19.13 5.118-10.236 13.844-28.024 19.381-39.602 5.538-11.495 10.992-22.067 12.082-23.493l2.098-2.517 6.209 3.104c22.57 11.495 70.814 39.519 83.064 48.244 7.383 5.286 9.313 8.726 10.236 17.956.923 9.481-3.524 23.241-11.663 36.078-4.698 7.383-5.369 9.145-3.691 9.145 1.594 0 6.208-5.453 10.404-12.082 4.027-6.46 9.648-21.059 11.327-29.114 1.174-5.873 3.104-7.887 6.88-7.132 3.691.672 13.76 5.873 32.134 16.445 8.307 4.783 18.123 10.404 21.731 12.502 3.86 2.181 7.216 4.866 8.139 6.293.839 1.426 1.426 2.601 1.342 2.768-.168.084-2.181-.839-4.614-2.013-3.524-1.762-4.615-1.93-5.622-1.091-2.601 2.181-.839 6.377 7.132 16.78 2.601 3.441 5.454 7.552 6.293 9.146l1.426 2.853-3.188-.588a294.65 294.65 0 0 0-9.649-1.09c-6.041-.42-6.545-.336-7.384 1.342-1.594 2.937.336 5.034 7.971 8.558 3.944 1.846 6.964 3.608 6.712 4.027-.251.336-2.768.923-5.537 1.175-5.706.503-7.551 1.594-7.551 4.363 0 2.517 3.943 4.95 12.669 7.887 6.796 2.181 6.796 2.181 8.39 6.293 2.349 6.208 7.971 11.41 12.502 11.41 2.517 0 2.097-.923-2.769-5.537-3.524-3.272-4.783-5.286-6.125-9.146l-1.594-5.034-7.132-2.517c-5.118-1.762-6.544-2.601-5.034-2.769 11.495-1.426 11.746-6.964.503-12.585-3.104-1.51-5.537-3.021-5.286-3.188.168-.252 3.86.419 8.223 1.342 9.061 2.014 11.662 1.762 11.662-1.175 0-1.929-4.53-9.229-11.494-18.542-3.44-4.615-2.685-4.195 6.041 3.356 3.272 2.769 7.131 5.957 8.726 7.048l2.768 1.93-.587-2.769c-.755-3.44-2.265-6.461-7.887-15.774-2.349-3.859-4.279-7.467-4.279-7.971 0-1.258 5.37 4.112 10.991 11.075 5.79 7.216 10.321 16.278 11.579 23.158.503 2.768.923 9.397.923 14.767 0 6.712.42 11.326 1.51 15.102.839 3.021 1.259 6.377 1.007 7.467-.336 1.343-2.853 3.524-8.39 6.964-14.264 8.978-24.08 18.375-25.591 24.332-1.09 4.195 1.762 2.685 9.985-5.118 11.578-10.991 26.01-20.137 30.289-19.046 2.013.504 9.565 6.796 26.01 21.731 17.535 15.942 28.778 21.983 47.153 25.674 4.531.923 11.998 1.93 16.613 2.182 13.257.923 38.092-1.678 45.559-4.783 2.266-.923 2.182-.923-1.51-1.678-4.279-.839-11.83-.503-23.912 1.007-14.683 1.762-34.065-.168-46.818-4.782-13.425-4.783-18.207-8.055-35.827-24.164-6.46-5.874-14.095-12.502-16.948-14.767-12.502-9.649-13.676-12.418-14.348-32.219-.419-10.32-.839-13.844-2.601-19.633-1.174-3.86-2.013-7.216-1.761-7.468.419-.419 7.802 4.951 9.816 7.132 1.259 1.343 1.259 2.098.168 7.803-1.175 5.957-1.342 19.466-.252 16.781 1.343-3.189 6.125-22.486 6.041-24.248-.168-2.853-5.453-7.887-14.515-13.676-4.447-2.853-11.411-8.475-15.69-12.67l-7.803-7.551-3.943.503c-4.531.504 3.356 4.783-71.15-39.015-62.34-36.749-82.644-48.244-100.432-56.97-8.81-4.363-8.893-4.447-8.474-7.047.336-2.266 0-3.021-2.937-5.538-8.474-7.132-28.023-17.536-33.057-17.536-1.51 0-2.77.671-3.524 1.846Zm6.544 5.118c1.427 1.09 1.343 1.426-1.93 5.706-1.845 2.517-4.782 7.047-6.46 10.152-1.594 3.188-3.105 5.705-3.272 5.705-.168 0 .923-2.769 2.433-6.125 1.51-3.272 3.608-8.39 4.699-11.327 1.006-2.852 2.181-5.202 2.433-5.202.335 0 1.258.504 2.097 1.091ZM53.937 185.24c-1.258 1.93-4.027 3.105-4.027 1.762 0-.503 3.776-3.272 4.95-3.524.168-.084-.252.755-.923 1.762Z" />
    <path d="M391.814 137.751c-13.76 2.265-28.191 9.397-36.078 18.039-11.243 12.25-17.032 27.1-16.109 41.448.587 8.558 1.762 12.417 4.782 15.774 2.937 3.272 3.944 2.517 2.601-1.846-1.342-4.615-2.517-11.243-1.846-10.404.336.335 2.35 3.188 4.447 6.209 2.182 3.02 5.286 6.376 6.964 7.551 2.937 2.013 3.021 2.013 2.35 6.209-.336 2.265-.672 9.061-.672 15.102 0 8.894.336 11.998 1.846 16.781 2.182 6.964 6.796 14.767 12.25 20.975l3.943 4.531-5.285 4.028c-9.146 6.88-14.18 14.011-11.831 16.445.336.335 2.517-1.427 4.867-3.86 2.349-2.517 6.376-5.873 8.977-7.635l4.699-3.105 4.866 3.021c12.334 7.383 25.171 9.313 37.085 5.454 1.762-.588 7.216-3.105 12.166-5.538 11.159-5.621 14.935-5.957 21.312-1.93 6.88 4.363 26.848 25.255 38.511 40.19 15.27 19.717 17.2 21.563 18.459 17.619.671-2.013.335-2.433-15.187-21.898-6.628-8.307-12.082-15.187-12.082-15.354 0-.168 4.531-.504 10.152-.756 18.207-1.006 35.324-4.363 40.861-7.97 1.175-.756 2.769-2.517 3.608-3.944l1.594-2.517v3.524c0 5.705-1.091 7.467-5.621 8.978-6.461 2.097-18.375 3.859-26.178 3.859-9.397 0-18.627.923-18.123 1.762.923 1.426 10.32 2.601 20.388 2.517 17.704-.084 32.387-4.195 33.813-9.313 2.601-9.229-1.846-38.847-10.068-67.542-14.096-49.167-31.883-75.261-55.46-81.386-9.984-2.601-23.073-.084-29.114 5.622l-1.93 1.762-5.118-5.622c-9.733-10.572-22.99-16.445-38.512-16.864-4.866-.168-9.9-.084-11.327.084Zm33.646 39.602c9.229 6.041 14.095 13.34 19.968 30.205 4.699 13.592 5.958 15.27 11.411 15.27 2.014 0 3.356-.839 6.041-3.775 4.279-4.699 7.803-5.119 11.579-1.427 7.551 7.635 3.608 19.885-7.551 23.157-6.041 1.846-6.964 1.762-6.293-.419.755-2.265-.336-11.243-1.259-10.32-.335.419-1.594 4.363-2.852 8.726-7.636 27.268-23.829 43.629-44.637 45.056-12.25.839-23.073-2.685-32.386-10.656-5.454-4.699-11.998-14.851-14.264-22.066-2.601-8.139-2.517-23.745.084-33.729 2.601-10.069 8.558-21.48 13.844-26.682 7.384-7.215 18.291-12.837 29.366-15.27 8.81-1.93 11.411-1.678 16.949 1.93Z" />
    <path d="M383.589 189.934c-3.44 3.776-.923 6.377 5.286 5.538 3.775-.504 4.531-.336 6.293 1.342 2.517 2.349 2.768 7.383.839 13.928-1.846 6.209-7.971 11.411-11.243 9.565-2.517-1.259-2.937-3.944-1.343-8.139 1.007-2.601 1.175-4.027.587-4.614-2.684-2.685-6.46 4.027-5.789 10.068.42 4.195 2.349 6.544 5.789 7.299l2.518.588-4.363 4.027c-2.434 2.266-4.112 4.447-3.86 4.95 1.93 3.105 16.026-9.229 20.053-17.535 7.467-15.271 2.685-28.527-10.152-28.527-2.098 0-3.776.587-4.615 1.51ZM415.726 198.745c-2.517.839-2.937 1.427-2.937 3.524 0 2.349.168 2.517 2.937 2.349 1.594-.083 4.363-.419 6.041-.755 2.768-.419 3.356-.251 5.621 2.182 1.594 1.762 2.937 2.601 3.776 2.265 3.44-1.342-.336-6.796-6.377-9.313-3.692-1.594-5.118-1.594-9.061-.252ZM400.539 218.376c-3.692 8.474-.084 16.025 7.047 15.102 5.874-.755 14.683-8.726 13.425-11.998-.755-2.098-2.937-1.259-5.957 2.265-1.678 1.93-4.363 4.028-5.957 4.699-2.769 1.174-3.021 1.174-4.447-.587-1.846-2.266-1.846-3.357-.252-7.3 1.762-4.195 1.594-6.125-.419-6.125-1.259 0-2.182 1.091-3.44 3.944ZM401.963 252.784c-3.272 3.02-3.02 3.02-10.152 1.762-1.091-.168-1.762.336-1.93 1.342-1.175 5.454 12.25 5.035 16.109-.503 3.441-4.866.504-6.712-4.027-2.601ZM172.825 250.09c-3.86 8.81-9.565 24.415-27.101 74.673-18.039 51.601-20.136 57.726-50.09 146.411-9.565 28.359-27.352 80.799-39.602 116.541-26.597 78.114-27.436 80.967-23.744 78.953 2.517-1.343 6.712-10.991 13.76-31.464 32.47-94.642 46.985-137.517 65.528-192.977 11.83-35.574 24.751-73.666 28.695-84.742 14.934-41.951 31.379-90.027 32.974-96.068 1.845-7.132 3.02-15.942 2.181-15.942-.252 0-1.426 2.098-2.601 4.615ZM195.062 251.61c0 2.685 5.454 21.06 16.362 54.705 5.789 17.955 15.522 48.58 21.479 67.961 6.041 19.382 13.76 44.133 17.116 54.957 16.529 52.858 40.273 134.664 57.473 198.011 10.32 38.008 11.495 41.112 12.921 35.91 1.679-6.544-.335-15.019-24.331-99.677-16.865-59.403-33.394-114.527-47.741-158.996-3.86-11.998-10.404-32.806-14.599-46.146-8.307-26.681-21.228-65.445-27.269-81.638-4.614-12.334-11.411-27.184-11.411-25.087ZM186.417 260.585c-1.93 7.132-2.433 35.239-2.014 112.849.504 100.18 2.937 179.637 7.803 253.807 1.762 27.436 3.021 34.652 5.202 30.457 1.846-3.44 1.93-10.824.252-38.428-5.034-82.56-7.803-180.895-7.971-280.236-.084-62.591-.252-72.744-1.426-76.351-1.175-3.776-1.343-3.944-1.846-2.098ZM113.503 265.281c-.419.335-.671 1.678-.671 3.02 0 2.685-.503 2.937-2.685.923-2.097-1.93-2.768-.839-1.09 1.762l1.426 2.098-3.44.587c-3.776.587-3.86 2.014 0 2.014 2.601 0 2.937.755 1.51 3.524-1.174 2.265-.251 2.936 1.678 1.174 1.511-1.342 1.594-1.258 2.098 1.594.335 1.595.923 2.937 1.258 2.937.923 0 1.762-2.098 1.762-4.447 0-1.342.252-1.51 1.007-.755 1.846 1.846 3.44 1.175 2.853-1.091-.504-1.846-.252-2.097 1.594-2.097 2.853 0 2.685-1.594-.419-2.601-2.35-.839-2.434-.923-1.091-2.937 1.594-2.517.923-3.44-1.762-2.181-1.762.755-2.014.671-2.685-1.678-.42-1.343-1.007-2.182-1.343-1.846ZM280.388 309.746c-2.685 2.685 3.524 12.166 15.69 24.248 14.515 14.432 33.309 27.604 49.167 34.485 17.116 7.467 40.357 14.85 53.53 17.116 11.411 2.013 17.368 2.097 20.556.419 1.343-.671 3.944-1.678 5.789-2.097 1.846-.504 3.189-1.175 2.937-1.343-.252-.252-6.377-1.007-13.76-1.678-34.568-3.272-64.27-12.921-87.175-28.527-16.026-10.823-29.031-22.738-39.099-35.743-5.286-6.796-6.544-7.97-7.635-6.88Z" />
    <path d="M518.503 352.707c-14.348 4.951-35.911 22.822-50.678 41.868-2.936 3.86-5.957 7.132-6.712 7.3-2.601.755-16.529 2.936-22.57 3.523-4.782.42-7.299.252-11.159-.922-3.524-1.091-5.453-1.259-6.796-.672-1.594.672-1.258 1.007 3.776 3.021 3.859 1.594 7.131 2.265 10.488 2.265 6.544 0 20.304-1.93 32.722-4.614 5.705-1.175 11.578-2.098 13.005-1.93 2.349.251 1.762.587-4.028 2.601-12.082 4.195-11.914 4.698 1.007 5.034 13.341.336 16.11 1.846 4.783 2.601-17.033 1.175-19.466 1.678-18.543 4.195.42 1.091 2.266 1.343 11.663 1.426 10.907.084 16.78.839 14.095 1.846-.671.252-5.957.671-11.578 1.007-5.706.252-10.908.755-11.579 1.007-1.93.671-1.342 1.93.923 1.93 3.021 0 10.907 3.104 12.585 5.034 2.014 2.181 1.343 2.181-10.236-.839-11.327-2.937-17.032-3.188-23.073-.839-2.433.923-6.041 1.678-7.971 1.678-3.104 0-3.775-.336-4.866-2.517-.671-1.343-1.259-4.447-1.259-6.964 0-5.118-.755-9.817-1.594-9.817-.335 0-1.594 4.447-2.936 9.817-3.105 12.921-7.048 23.744-8.559 23.744-2.433 0-21.227-4.363-32.638-7.551-13.844-3.859-21.227-6.544-29.869-10.907-19.717-9.817-29.702-20.892-31.967-35.575-.839-5.37-.755-7.048.587-11.998 2.433-9.565 2.517-10.488.755-10.152-4.195.755-7.635 11.41-6.712 20.891 2.014 21.731 19.13 37.673 52.943 49.084l9.229 3.104 1.426 8.726c.839 4.698 2.685 12.418 4.196 16.948 1.594 4.615 2.684 8.223 2.433 8.055-.168-.252-4.615-7.467-9.733-16.109-6.964-11.663-9.817-15.774-10.991-15.774-2.433 0-2.433 3.943 0 9.229 2.349 5.118 31.212 53.614 37.588 63.095 4.95 7.384 5.286 7.551 23.745 8.81 9.9.671 23.157.671 50.761-.084 80.799-2.097 89.105-2.433 93.804-3.859 2.852-.839 5.705-1.175 7.97-.839 4.279.671 30.96-.84 37.924-2.182 8.894-1.594 11.831-4.699 9.649-9.984-2.349-5.706-9.313-7.971-27.268-8.894-12.334-.587-14.096-1.091-15.019-4.111-.419-1.427 1.007-2.434 10.656-7.3 12.334-6.209 15.69-8.81 15.69-11.83 0-4.951-12.166-36.582-21.312-55.544-17.871-37.001-35.574-58.48-54.033-65.78-5.538-2.181-14.767-2.349-20.724-.252Zm16.445 119.31c9.649 27.269 10.488 29.115 13.34 29.786 2.266.503 8.475 0 11.999-1.007 1.258-.336 1.426.252 1.426 4.531 0 3.104.503 5.621 1.342 6.796 1.259 1.846 1.175 1.846-2.013 1.846-4.028 0-6.041-1.93-6.629-6.712-.419-3.189-.671-3.44-2.685-3.021-7.383 1.343-8.306 1.343-9.648.084-1.175-1.259-5.119-12.837-12.25-36.498l-2.685-8.726-4.279 6.964c-12.502 20.137-23.913 33.226-37.589 43.042-10.236 7.384-12.333 8.223-21.311 8.139h-7.551l5.957-1.93c11.243-3.608 22.15-11.327 34.484-24.248 9.397-9.816 22.989-28.275 27.688-37.672 2.097-4.195 2.181-4.279 3.02-2.349a2540.88 2540.88 0 0 1 7.384 20.975Zm49.754 26.346c.671 2.853 3.776 3.692 16.026 4.279 6.041.252 13.089.923 15.857 1.426 5.035.923 9.649 3.86 8.642 5.454-1.51 2.433-18.71 4.447-38.679 4.447-12.921 0-14.431-.168-16.948-1.762-1.678-1.007-3.021-2.685-3.356-3.944a50.69 50.69 0 0 0-1.343-5.034c-.419-1.51-.671-2.936-.503-3.104.755-.755 13.844-3.692 16.696-3.692 2.601-.084 3.189.252 3.608 1.93Zm-165.96 11.411c2.685 1.594 7.887 4.027 11.663 5.286l6.712 2.349-7.132-.587c-6.46-.42-15.186-1.679-15.522-2.266-.084-.084-2.517-3.859-5.37-8.474l-5.202-8.306 5.035 4.53c2.684 2.517 7.131 5.874 9.816 7.468Z" />
    <path d="M628.419 447.434c-2.265.084-6.88.671-10.152 1.175l-5.957.923 2.349 4.363c2.853 5.286 6.209 14.012 6.964 18.291.503 2.684.168 3.44-2.098 6.041-2.601 3.02-14.599 9.648-20.975 11.494-1.762.588-3.273 1.427-3.273 2.014 0 2.265 2.182 2.937 9.649 2.937 8.558.083 19.046 1.678 22.738 3.607 2.769 1.427 9.565 8.391 9.565 9.817 0 .503-.588 1.091-1.259 1.342-.923.42-1.007.923-.419 2.098 1.678 3.021 6.712 3.524 28.946 2.937 27.437-.755 32.051-1.259 34.317-3.944 1.762-2.013 2.097-2.097 10.739-1.762 10.74.42 21.312-.839 25.591-3.104 7.886-4.111 13.76-20.137 13.927-37.84.084-13.677-3.356-19.466-10.236-17.117-2.685 1.007-5.034 5.202-8.558 15.019-3.272 9.397-6.041 14.431-8.558 15.186-1.007.336-5.538.588-9.984.672-9.062.084-11.411 1.09-8.81 3.691 1.258 1.175 3.104 1.427 10.907 1.427 8.474 0 9.649-.168 12.166-1.93 2.937-2.181 5.873-7.383 10.236-18.626 1.511-3.944 3.273-7.72 3.86-8.391 5.034-5.37 4.614 21.479-.504 34.484-3.859 9.649-7.467 11.495-24.835 12.25-9.649.42-11.075.336-11.495-.839-.251-.755-.922-5.454-1.426-10.404-2.097-21.395-5.957-38.511-9.565-42.79-1.93-2.266-2.097-2.266-16.529-2.853-14.179-.587-38.847-.671-47.321-.168ZM443.663 532.847c-.587 1.342-2.266 7.048-3.608 12.585-2.685 10.404-9.565 32.722-21.144 68.381-12.585 39.015-16.025 52.859-13.088 52.859 2.265 0 3.859-2.853 6.125-10.908 1.174-4.362 6.124-20.052 10.991-34.819 13.844-42.371 22.57-76.855 21.982-86.588l-.251-4.027-1.007 2.517ZM516.828 537.21c.756 5.37 9.314 37.421 16.026 60.242 15.522 52.44 19.381 64.354 21.815 68.214 1.09 1.594 1.51 1.762 2.601.923 1.594-1.427 1.09-5.035-2.685-17.117a4929.859 4929.859 0 0 1-7.971-27.268c-2.853-9.901-7.216-24.5-9.649-32.303-2.517-7.887-5.705-18.626-7.132-23.912-3.775-14.012-8.39-27.772-10.236-30.457-2.433-3.44-3.44-2.853-2.769 1.678Z" />
  </svg>
);

export { SvgEmpty, SvgEntry };
