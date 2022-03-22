import {$} from '@/dom';

export function resizeHandler($root, event) {
    const $resizer = $(event.target);
    const $parent = $resizer.closest('[data-type="resizable"]');
    const coords = $parent.getCoords();
    const colIndex = $parent.data.col;
    const type = $resizer.data.resize;
    let value;

    $resizer.css({opacity: 1});

    document.onmousemove = e => {
        if (type === 'col') {
            const delta = e.pageX - coords.right;
            value = coords.width + delta;
            $resizer.css({
                bottom: '-5000px',
                right: -delta + 'px',
            });
        } else {
            const delta = e.pageY - coords.bottom;
            value = coords.height + delta;
            $resizer.css({
                bottom: -delta + 'px',
                right: '-5000px',
            });
        }
    };
    document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;

        if (type === 'col') {
            $parent.css({width: value + 'px'});
            $root.findAll(`[data-col="${colIndex}"]`)
                .forEach(el => el.style.width = value + 'px');
        } else {
            $parent.css({height: value + 'px'});
        }

        $resizer.css({
            opacity: 0,
            bottom: 0,
            right: 0,
            left: 0,
        });
    };
}