import {
  EventDispatcher,
  Matrix4,
  Plane,
  Camera,
  Raycaster,
  Vector2,
  Object3D,
  Intersection,
  Vector3
} from "three";

export class DragControl extends EventDispatcher {
  raycaster = new Raycaster();
  mouse = new Vector2();
  selected?: Object3D;
  hovered?: Object3D;
  enabled = true;

  constructor(
    readonly objects: Object3D[],
    readonly plane: Object3D,
    readonly camera: Camera,
    readonly el: HTMLElement,
    readonly options = { cancel: { onMouseLeave: false } }
  ) {
    super();
    this.activate(); // TODO: no
  }

  boundOnDocumentMouseMove = this.onDocumentMouseMove.bind(this);
  boundOnDocumentMouseDown = this.onDocumentMouseDown.bind(this);
  boundOnDocumentMouseCancel = this.onDocumentMouseCancel.bind(this);

  activate() {
    this.el.addEventListener("mousemove", this.boundOnDocumentMouseMove, false);
    this.el.addEventListener("mousedown", this.boundOnDocumentMouseDown, false);
    this.el.addEventListener("mouseup", this.boundOnDocumentMouseCancel, false);
    if (this.options.cancel.onMouseLeave) {
      this.el.addEventListener(
        "mouseleave",
        this.boundOnDocumentMouseCancel,
        false
      );
    }
  }

  deactivate() {
    this.el.removeEventListener(
      "mousemove",
      this.boundOnDocumentMouseMove,
      false
    );
    this.el.removeEventListener(
      "mousedown",
      this.boundOnDocumentMouseDown,
      false
    );
    this.el.removeEventListener(
      "mouseup",
      this.boundOnDocumentMouseCancel,
      false
    );
    this.el.removeEventListener(
      "mouseleave",
      this.boundOnDocumentMouseCancel,
      false
    );

    this.el.style.cursor = "";
  }

  dispose() {
    this.deactivate();
  }

  getObjects() {
    return this.objects;
  }

  onDocumentMouseMove(event: MouseEvent) {
    event.preventDefault();

    var rect = this.el.getBoundingClientRect();

    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);

    if (this.selected && this.enabled) {
      const intersections = this.raycaster.intersectObjects([this.plane]);
      if (intersections[0]) {
        const intersection = intersections[0];
        if (intersection.face) {
          this.selected.position
            .copy(intersection.point)
            .add(intersection.face.normal);
        }
      }

      this.dispatchEvent({ type: "drag", object: this.selected });

      return;
    }
  }

  onDocumentMouseDown(event: MouseEvent) {
    event.preventDefault();

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersections = this.raycaster.intersectObjects(this.objects, true);

    if (intersections.length > 0) {
      this.selected = intersections[0].object;
      this.el.style.cursor = "move";

      this.dispatchEvent({ type: "dragstart", object: this.selected });
    }
  }

  onDocumentMouseCancel(event: MouseEvent) {
    event.preventDefault();

    if (this.selected) {
      this.dispatchEvent({ type: "dragend", object: this.selected });

      this.selected = undefined;
    }

    this.el.style.cursor = "auto";
  }
}
