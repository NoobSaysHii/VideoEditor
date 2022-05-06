import { useCallback, useEffect, useState } from 'react';
import CameraRoll from '@react-native-community/cameraroll';

const recentFilters = {
  Videos: {
    count: 'all',
    title: 'Recent Videos',
  },
  Photos: {
    count: 'all',
    title: 'Recent Photos',
  },
};

const useCameraRoll = (assetType = 'Videos', limit = 15) => {
  const [offset, setOffset] = useState(0);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const recentFilter = recentFilters[assetType];
  const [availableFilters, setFilters] = useState([recentFilter]);
  const [activeFilter, setFilter] = useState(0);

  const getItems = useCallback(
    (after, index = 0, allFilters = []) => {
      const currentFilter = index === 0 ? '' : allFilters[index]?.title;
      CameraRoll.getPhotos({
        first: index === 0 ? limit : 200,
        include: ['filename', 'fileSize', 'imageSize', 'playableDuration'],
        assetType,
        after: `${after}`,
        groupName: `${currentFilter}`,
      }).then(({ page_info, edges }) => {
        setHasMore(page_info.has_next_page);
        setItems((prevVideos) => [...prevVideos, ...edges]);
      });
    },
    [assetType, limit]
  );

  const onSelect = useCallback(
    (index) => {
      setItems([]);
      setFilter(index);
      getItems(0, index, availableFilters);
    },
    [availableFilters, getItems]
  );

  const getAlbums = useCallback(() => {
    CameraRoll.getAlbums({
      assetType,
    }).then((data) => {
      setFilters([recentFilter, ...data]);
      getItems(0, 0, data);
    });
  }, [assetType, getItems, recentFilter]);

  useEffect(() => {
    getAlbums();
    return () => {
      setFilters([recentFilter]);
      setFilter(0);
      setOffset(0);
      setHasMore(true);
      setItems([]);
    };
  }, [getAlbums, recentFilter]);

  const getMore = useCallback(() => {
    if (hasMore && activeFilter !== 0) {
      setOffset((prevOffset) => {
        const newOffset = prevOffset + limit;
        getItems(newOffset, activeFilter, availableFilters);
        return newOffset;
      });
    }
  }, [activeFilter, availableFilters, getItems, hasMore, limit]);

  return {
    items,
    offset,
    hasMore,
    activeFilter,
    availableFilters,
    onSelect,
    getMore,
  };
};

export default useCameraRoll;