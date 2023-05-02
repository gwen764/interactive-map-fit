import * as d3 from 'd3';
import { useLayoutEffect, useRef } from 'react'

/**
 * A hook that creates a D3 selection from a DOM element and renders a chart using D3.
 * @memberof Core.Hooks
 * @function
 * @param {function} renderFunc - The function that renders the chart using D3.
 * @param {Array} dependencies - An array of dependencies that triggers the hook to update.
 * @returns {object} A React ref object.
 */
export const useD3 = (renderFunc, dependencies) => {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if(ref) {
      renderFunc(d3.select(ref.current))
    }
    return () => {};
  }, dependencies);
  
  return ref;
}