'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

exports['default'] = HomeScreen;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _lucideReactNative = require('lucide-react-native');

var _componentsProductCard = require('../components/ProductCard');

var _componentsProductCard2 = _interopRequireDefault(_componentsProductCard);

var _api = require('../api');

var _contextCartContext = require('../context/CartContext');

function HomeScreen(_ref) {
  var _this = this;

  var onOpenMenu = _ref.onOpenMenu;
  var onSelectProduct = _ref.onSelectProduct;

  var _useContext = (0, _react.useContext)(_contextCartContext.CartContext);

  var addToCart = _useContext.addToCart;

  var _useState = (0, _react.useState)(null);

  var _useState2 = _slicedToArray(_useState, 2);

  var selectedProduct = _useState2[0];
  var setSelectedProduct = _useState2[1];

  var _useState3 = (0, _react.useState)(1);

  var _useState32 = _slicedToArray(_useState3, 2);

  var qty = _useState32[0];
  var setQty = _useState32[1];

  var _useState4 = (0, _react.useState)('');

  var _useState42 = _slicedToArray(_useState4, 2);

  var selectedSize = _useState42[0];
  var setSelectedSize = _useState42[1];

  var _useState5 = (0, _react.useState)(false);

  var _useState52 = _slicedToArray(_useState5, 2);

  var successMsg = _useState52[0];
  var setSuccessMsg = _useState52[1];

  var _useState6 = (0, _react.useState)([{ id: '', name: 'All Groups', image: null }, { id: 'cat_tanks', name: 'Water Storage Tanks', image: 'https://www.ganeshgouriindustries.com/images/index/new-product/tank.png' }, { id: 'cat_cpvc', name: 'CPVC Pipes & Fittings', image: 'https://www.ganeshgouriindustries.com/images/index/new-product/cpvc.png' }, { id: 'cat_upvc', name: 'UPVC Pipes & Fittings', image: 'https://www.ganeshgouriindustries.com/images/index/new-product/upvc.png' }, { id: 'cat_swr', name: 'SWR Drainage Pipes & Fittings', image: 'https://www.ganeshgouriindustries.com/images/index/new-product/SWR-Pipes.png' }, { id: 'cat_casing', name: 'UPVC CASING PIPES', image: 'https://www.ganeshgouriindustries.com/images/index/new-product/Casing-Pipe.png' }, { id: 'cat_agri', name: 'Agriculture Pipes & Fittings', image: 'https://www.ganeshgouriindustries.com/images/index/new-product/Agri-Pipes.png' }, { id: 'cat_hdpe', name: 'HDPE PIPE & FITTINGS', image: 'https://www.ganeshgouriindustries.com/images/index/new-product/hdpe.png' }, { id: 'cat_sprinkler', name: 'Sprinkler Pipes & Fittings', image: 'https://www.ganeshgouriindustries.com/images/index/Sprinkler-Pipe.png' }, { id: 'cat_column', name: 'UPVC COLUMN PIPES', image: 'https://www.ganeshgouriindustries.com/images/index/new-product/Column-Pipes.png' }, { id: 'cat_sanitary', name: 'Toilet Seat Cover & Flushing Cistern', image: 'https://www.ganeshgouriindustries.com/images/index/SANITARY-WARE.png' }, { id: 'cat_eco_drainage', name: 'Eco Drainage Pipes', image: 'https://www.ganeshgouriindustries.com/images/index/Dranage-Pipe.png' }, { id: 'cat_garden', name: 'Garden, Braided & LDPE Pipes', image: 'https://www.ganeshgouriindustries.com/images/index/C.png' }, { id: 'cat_solvent', name: 'Solvent Cement & Lubricants', image: 'https://www.ganeshgouriindustries.com/assets/img/product/solvent-cement.webp' }, { id: 'cat_drip', name: 'DRIP IRRIGATION SYSTEM', image: 'https://www.ganeshgouriindustries.com/images/index/new-product/drip.png' }, { id: 'cat_household', name: 'HOUSEHOLD PRODUCTS', image: 'https://www.ganeshgouriindustries.com/images/index/new-product/household.png' }, { id: 'cat_faucets', name: 'FAUCETS', image: 'https://www.ganeshgouriindustries.com/images/index/new-product/faucet.png' }]);

  var _useState62 = _slicedToArray(_useState6, 2);

  var categories = _useState62[0];
  var setCategories = _useState62[1];

  var _useState7 = (0, _react.useState)([]);

  var _useState72 = _slicedToArray(_useState7, 2);

  var products = _useState72[0];
  var setProducts = _useState72[1];

  var _useState8 = (0, _react.useState)([]);

  var _useState82 = _slicedToArray(_useState8, 2);

  var subCategories = _useState82[0];
  var setSubCategories = _useState82[1];

  var _useState9 = (0, _react.useState)('');

  var _useState92 = _slicedToArray(_useState9, 2);

  var selectedCat = _useState92[0];
  var setSelectedCat = _useState92[1];

  var _useState10 = (0, _react.useState)('');

  var _useState102 = _slicedToArray(_useState10, 2);

  var selectedSubCat = _useState102[0];
  var setSelectedSubCat = _useState102[1];

  var _useState11 = (0, _react.useState)('');

  var _useState112 = _slicedToArray(_useState11, 2);

  var search = _useState112[0];
  var setSearch = _useState112[1];

  (0, _react.useEffect)(function () {
    fetchBackendCategories();
    fetchBackendSubCategories();
  }, []);

  (0, _react.useEffect)(function () {
    fetchBackendData();
  }, [selectedCat, selectedSubCat, search]);

  var fetchBackendSubCategories = function fetchBackendSubCategories() {
    var res;
    return regeneratorRuntime.async(function fetchBackendSubCategories$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return regeneratorRuntime.awrap((0, _api.apiRequest)('/subcategories'));

        case 2:
          res = context$2$0.sent;

          if (res.success && res.subCategories) {
            setSubCategories(res.subCategories);
          }

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  };

  var fetchBackendCategories = function fetchBackendCategories() {
    var res;
    return regeneratorRuntime.async(function fetchBackendCategories$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return regeneratorRuntime.awrap((0, _api.apiRequest)('/categories'));

        case 2:
          res = context$2$0.sent;

          if (res.success && res.categories && res.categories.length > 0) {
            setCategories([{ id: '', name: 'All Groups', image: null }].concat(_toConsumableArray(res.categories)));
          }

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  };

  var fetchBackendData = function fetchBackendData() {
    var url, res;
    return regeneratorRuntime.async(function fetchBackendData$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          url = '/products?';

          if (selectedCat) url += 'categoryId=' + selectedCat + '&';
          if (selectedSubCat) url += 'subcategoryId=' + selectedSubCat + '&';
          if (search) url += 'search=' + encodeURIComponent(search) + '&';

          context$2$0.next = 6;
          return regeneratorRuntime.awrap((0, _api.apiRequest)(url));

        case 6:
          res = context$2$0.sent;

          if (res.success && res.products) {
            setProducts(res.products);
          }

        case 8:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  };

  var filteredProducts = products.filter(function (p) {
    var matchesCat = !selectedCat || p.categoryId === selectedCat;
    var matchesSubCat = !selectedSubCat || p.subcategoryId === selectedSubCat;
    var matchesSearch = !search || p.name.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSubCat && matchesSearch;
  });

  var handleSelectCategory = function handleSelectCategory(catId) {
    setSelectedCat(catId);
    setSelectedSubCat('');
  };

  var handleSelectSubCategory = function handleSelectSubCategory(subCatId) {
    setSelectedSubCat(subCatId);
  };

  var currentSubCats = subCategories.filter(function (sc) {
    return sc.categoryId === selectedCat;
  });
  var showSubCategories = selectedCat && !selectedSubCat && !search && currentSubCats.length > 0;

  var handleOpenProductDetail = function handleOpenProductDetail(product) {
    setSelectedProduct(product);
    setQty(1);
    setSelectedSize(product.sizes && product.sizes.length > 0 ? product.sizes[0] : '');
    setSuccessMsg(false);
  };

  var handleConfirmAddToCart = function handleConfirmAddToCart() {
    if (!selectedProduct) return;
    addToCart(selectedProduct, qty, selectedSize);
    setSuccessMsg(true);
    setTimeout(function () {
      setSelectedProduct(null);
      setSuccessMsg(false);
    }, 1200);
  };

  return _react2['default'].createElement(
    _reactNative.View,
    { style: styles.container },
    _react2['default'].createElement(
      _reactNative.View,
      { style: styles.topHeader },
      _react2['default'].createElement(
        _reactNative.TouchableOpacity,
        { onPress: onOpenMenu, style: styles.menuBtn },
        _react2['default'].createElement(_lucideReactNative.Menu, { size: 22, color: '#0f172a' })
      ),
      _react2['default'].createElement(
        _reactNative.View,
        { style: styles.titleBox },
        _react2['default'].createElement(
          _reactNative.Text,
          { style: styles.headerTitle },
          'Gouri Aqua Plast'
        ),
        _react2['default'].createElement(
          _reactNative.Text,
          { style: styles.headerSub },
          'Tanks, Pipes & Fittings Catalog'
        )
      ),
      _react2['default'].createElement(
        _reactNative.View,
        { style: styles.policyBadge },
        _react2['default'].createElement(_lucideReactNative.Shield, { size: 14, color: '#0ea5e9' })
      )
    ),
    _react2['default'].createElement(
      _reactNative.View,
      { style: styles.searchSection },
      _react2['default'].createElement(
        _reactNative.View,
        { style: styles.searchContainer },
        _react2['default'].createElement(_lucideReactNative.Search, { size: 18, color: '#64748b', style: { marginRight: 8 } }),
        _react2['default'].createElement(_reactNative.TextInput, {
          style: styles.searchInput,
          placeholder: 'Search product name or model...',
          placeholderTextColor: '#64748b',
          value: search,
          onChangeText: setSearch
        })
      )
    ),
    !selectedCat && !search ? _react2['default'].createElement(_reactNative.FlatList, {
      data: categories.filter(function (c) {
        return c.id !== '';
      }),
      keyExtractor: function (item, index) {
        return item.id || 'cat_' + index;
      },
      numColumns: 2,
      renderItem: function (_ref2) {
        var item = _ref2.item;
        return _react2['default'].createElement(
          _reactNative.TouchableOpacity,
          { style: styles.groupCard, activeOpacity: 0.8, onPress: function () {
              return handleSelectCategory(item.id);
            } },
          _react2['default'].createElement(
            _reactNative.View,
            { style: styles.groupImageContainer },
            item.image ? _react2['default'].createElement(_reactNative.Image, { source: (0, _api.getImageUrl)(item.image), style: styles.groupImage, resizeMode: 'contain' }) : _react2['default'].createElement(_reactNative.View, { style: styles.groupImagePlaceholder })
          ),
          _react2['default'].createElement(
            _reactNative.View,
            { style: styles.groupTextContainer },
            _react2['default'].createElement(
              _reactNative.Text,
              { style: styles.groupName, numberOfLines: 2 },
              item.name
            )
          )
        );
      },
      contentContainerStyle: styles.gridContent
    }) : showSubCategories ? _react2['default'].createElement(
      _react2['default'].Fragment,
      null,
      _react2['default'].createElement(
        _reactNative.View,
        { style: styles.categorySection },
        _react2['default'].createElement(
          _reactNative.ScrollView,
          { horizontal: true, showsHorizontalScrollIndicator: false, contentContainerStyle: styles.categoryScroll },
          categories.map(function (cat, index) {
            var isSelected = selectedCat === cat.id;
            return _react2['default'].createElement(
              _reactNative.TouchableOpacity,
              {
                key: cat.id || 'chip_' + index,
                style: [styles.catChip, isSelected && styles.catChipActive],
                onPress: function () {
                  return handleSelectCategory(cat.id);
                }
              },
              cat.image ? _react2['default'].createElement(_reactNative.Image, { source: (0, _api.getImageUrl)(cat.image), style: styles.catChipImg, resizeMode: 'contain' }) : null,
              _react2['default'].createElement(
                _reactNative.Text,
                { style: [styles.catChipText, isSelected && styles.catChipTextActive] },
                cat.name
              )
            );
          })
        )
      ),
      _react2['default'].createElement(
        _reactNative.View,
        { style: styles.sectionHeaderBox },
        _react2['default'].createElement(
          _reactNative.Text,
          { style: styles.sectionHeaderText },
          'Select Sub Category'
        )
      ),
      _react2['default'].createElement(_reactNative.FlatList, {
        data: currentSubCats,
        keyExtractor: function (item, index) {
          return item.id || 'subcat_' + index;
        },
        numColumns: 2,
        renderItem: function (_ref3) {
          var item = _ref3.item;
          return _react2['default'].createElement(
            _reactNative.TouchableOpacity,
            { style: styles.groupCard, activeOpacity: 0.8, onPress: function () {
                return handleSelectSubCategory(item.id);
              } },
            _react2['default'].createElement(
              _reactNative.View,
              { style: styles.groupImageContainer },
              item.image ? _react2['default'].createElement(_reactNative.Image, { source: (0, _api.getImageUrl)(item.image), style: styles.groupImage, resizeMode: 'contain' }) : _react2['default'].createElement(_reactNative.View, { style: styles.groupImagePlaceholder })
            ),
            _react2['default'].createElement(
              _reactNative.View,
              { style: styles.groupTextContainer },
              _react2['default'].createElement(
                _reactNative.Text,
                { style: styles.groupName, numberOfLines: 2 },
                item.name
              )
            )
          );
        },
        contentContainerStyle: styles.gridContent
      })
    ) : _react2['default'].createElement(
      _react2['default'].Fragment,
      null,
      _react2['default'].createElement(
        _reactNative.View,
        { style: styles.categorySection },
        _react2['default'].createElement(
          _reactNative.ScrollView,
          { horizontal: true, showsHorizontalScrollIndicator: false, contentContainerStyle: styles.categoryScroll },
          categories.map(function (cat, index) {
            var isSelected = selectedCat === cat.id;
            return _react2['default'].createElement(
              _reactNative.TouchableOpacity,
              {
                key: cat.id || 'chip_' + index,
                style: [styles.catChip, isSelected && styles.catChipActive],
                onPress: function () {
                  return handleSelectCategory(cat.id);
                }
              },
              cat.image ? _react2['default'].createElement(_reactNative.Image, { source: (0, _api.getImageUrl)(cat.image), style: styles.catChipImg, resizeMode: 'contain' }) : null,
              _react2['default'].createElement(
                _reactNative.Text,
                { style: [styles.catChipText, isSelected && styles.catChipTextActive] },
                cat.name
              )
            );
          })
        )
      ),
      selectedCat && currentSubCats.length > 0 && !search && _react2['default'].createElement(
        _reactNative.View,
        { style: styles.subCategorySection },
        _react2['default'].createElement(
          _reactNative.ScrollView,
          { horizontal: true, showsHorizontalScrollIndicator: false, contentContainerStyle: styles.categoryScroll },
          _react2['default'].createElement(
            _reactNative.TouchableOpacity,
            {
              style: [styles.catChip, !selectedSubCat && styles.catChipActive],
              onPress: function () {
                return setSelectedSubCat('');
              }
            },
            _react2['default'].createElement(
              _reactNative.Text,
              { style: [styles.catChipText, !selectedSubCat && styles.catChipTextActive] },
              'All'
            )
          ),
          currentSubCats.map(function (sub, index) {
            var isSelSub = selectedSubCat === sub.id;
            return _react2['default'].createElement(
              _reactNative.TouchableOpacity,
              {
                key: sub.id || 'subchip_' + index,
                style: [styles.catChip, isSelSub && styles.catChipActive],
                onPress: function () {
                  return handleSelectSubCategory(sub.id);
                }
              },
              _react2['default'].createElement(
                _reactNative.Text,
                { style: [styles.catChipText, isSelSub && styles.catChipTextActive] },
                sub.name
              )
            );
          })
        )
      ),
      _react2['default'].createElement(_reactNative.FlatList, {
        data: filteredProducts,
        keyExtractor: function (item) {
          return item.id;
        },
        numColumns: 2,
        renderItem: function (_ref4) {
          var item = _ref4.item;
          return _react2['default'].createElement(_componentsProductCard2['default'], { product: item, onSelect: handleOpenProductDetail });
        },
        contentContainerStyle: styles.gridContent,
        ListEmptyComponent: _react2['default'].createElement(
          _reactNative.View,
          { style: styles.emptyBox },
          _react2['default'].createElement(
            _reactNative.Text,
            { style: styles.emptyText },
            'No matching quotation products found.'
          )
        )
      })
    ),
    _react2['default'].createElement(
      _reactNative.Modal,
      {
        visible: !!selectedProduct,
        animationType: 'fade',
        transparent: true,
        onRequestClose: function () {
          return !successMsg && setSelectedProduct(null);
        }
      },
      _react2['default'].createElement(
        _reactNative.TouchableOpacity,
        {
          style: styles.modalOverlay,
          activeOpacity: 1,
          onPress: function () {
            return !successMsg && setSelectedProduct(null);
          }
        },
        _react2['default'].createElement(
          _reactNative.View,
          { style: styles.modalContent, onStartShouldSetResponder: function () {
              return true;
            } },
          selectedProduct && _react2['default'].createElement(
            _reactNative.View,
            { style: { width: '100%' } },
            _react2['default'].createElement(
              _reactNative.View,
              { style: styles.modalHeader },
              _react2['default'].createElement(
                _reactNative.View,
                { style: { flex: 1 } },
                _react2['default'].createElement(
                  _reactNative.Text,
                  { style: styles.modalProductTitle, numberOfLines: 1 },
                  selectedProduct.name
                ),
                _react2['default'].createElement(
                  _reactNative.Text,
                  { style: styles.modalCategoryTitle },
                  selectedProduct.categoryName || 'Catalog Item'
                )
              ),
              _react2['default'].createElement(
                _reactNative.TouchableOpacity,
                {
                  style: styles.closeModalBtn,
                  onPress: function () {
                    return !successMsg && setSelectedProduct(null);
                  }
                },
                _react2['default'].createElement(_lucideReactNative.X, { size: 20, color: '#64748b' })
              )
            ),
            _react2['default'].createElement(
              _reactNative.ScrollView,
              { showsVerticalScrollIndicator: false, style: styles.modalScroll },
              _react2['default'].createElement(_reactNative.Image, { source: (0, _api.getImageUrl)(selectedProduct.image), style: styles.modalImage, resizeMode: 'contain' }),
              _react2['default'].createElement(
                _reactNative.Text,
                { style: styles.modalSectionTitle },
                'Specifications'
              ),
              _react2['default'].createElement(
                _reactNative.Text,
                { style: styles.modalDescription },
                selectedProduct.description || 'No description available for this item.'
              ),
              selectedProduct.sizes && selectedProduct.sizes.length > 0 && _react2['default'].createElement(
                _reactNative.View,
                { style: styles.sizesSection },
                _react2['default'].createElement(
                  _reactNative.Text,
                  { style: styles.modalSectionTitle },
                  'Select Size Option'
                ),
                _react2['default'].createElement(
                  _reactNative.View,
                  { style: styles.sizeChipsRow },
                  selectedProduct.sizes.map(function (sz, i) {
                    var isSel = selectedSize === sz;
                    return _react2['default'].createElement(
                      _reactNative.TouchableOpacity,
                      {
                        key: i,
                        style: [styles.sizeSelectorChip, isSel && styles.sizeSelectorChipActive],
                        onPress: function () {
                          return !successMsg && setSelectedSize(sz);
                        }
                      },
                      _react2['default'].createElement(
                        _reactNative.Text,
                        { style: [styles.sizeSelectorChipText, isSel && styles.sizeSelectorChipTextActive] },
                        sz
                      )
                    );
                  })
                )
              ),
              _react2['default'].createElement(
                _reactNative.View,
                { style: styles.qtySection },
                _react2['default'].createElement(
                  _reactNative.Text,
                  { style: styles.modalSectionTitle },
                  'Configure Quantity'
                ),
                _react2['default'].createElement(
                  _reactNative.View,
                  { style: styles.stepperContainer },
                  _react2['default'].createElement(
                    _reactNative.TouchableOpacity,
                    {
                      style: styles.stepperBtn,
                      onPress: function () {
                        return !successMsg && setQty(function (prev) {
                          return Math.max(1, prev - 10);
                        });
                      }
                    },
                    _react2['default'].createElement(
                      _reactNative.Text,
                      { style: styles.stepperBtnTxt },
                      '-10'
                    )
                  ),
                  _react2['default'].createElement(
                    _reactNative.TouchableOpacity,
                    {
                      style: styles.stepperBtn,
                      onPress: function () {
                        return !successMsg && setQty(function (prev) {
                          return Math.max(1, prev - 1);
                        });
                      }
                    },
                    _react2['default'].createElement(_lucideReactNative.Minus, { size: 14, color: '#0f172a' })
                  ),
                  _react2['default'].createElement(
                    _reactNative.Text,
                    { style: styles.stepperValue },
                    qty
                  ),
                  _react2['default'].createElement(
                    _reactNative.TouchableOpacity,
                    {
                      style: styles.stepperBtn,
                      onPress: function () {
                        return !successMsg && setQty(function (prev) {
                          return prev + 1;
                        });
                      }
                    },
                    _react2['default'].createElement(_lucideReactNative.Plus, { size: 14, color: '#0f172a' })
                  ),
                  _react2['default'].createElement(
                    _reactNative.TouchableOpacity,
                    {
                      style: styles.stepperBtn,
                      onPress: function () {
                        return !successMsg && setQty(function (prev) {
                          return prev + 10;
                        });
                      }
                    },
                    _react2['default'].createElement(
                      _reactNative.Text,
                      { style: styles.stepperBtnTxt },
                      '+10'
                    )
                  )
                )
              )
            ),
            _react2['default'].createElement(
              _reactNative.View,
              { style: styles.modalFooter },
              successMsg ? _react2['default'].createElement(
                _reactNative.View,
                { style: styles.successMessageBtn },
                _react2['default'].createElement(_lucideReactNative.Check, { size: 18, color: '#ffffff', style: { marginRight: 6 } }),
                _react2['default'].createElement(
                  _reactNative.Text,
                  { style: styles.successMessageText },
                  'Added to Quote Cart!'
                )
              ) : _react2['default'].createElement(
                _reactNative.TouchableOpacity,
                {
                  style: styles.confirmAddBtn,
                  onPress: handleConfirmAddToCart
                },
                _react2['default'].createElement(
                  _reactNative.Text,
                  { style: styles.confirmAddBtnText },
                  'Add to Quote Cart'
                )
              )
            )
          )
        )
      )
    )
  );
}

var styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc'
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 45,
    paddingBottom: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0'
  },
  menuBtn: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: '#f1f5f9'
  },
  titleBox: {
    alignItems: 'center'
  },
  headerTitle: {
    color: '#0f172a',
    fontSize: 16,
    fontWeight: '800'
  },
  headerSub: {
    color: '#0ea5e9',
    fontSize: 11,
    fontWeight: '600'
  },
  policyBadge: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: 'rgba(14, 165, 233, 0.12)'
  },
  searchSection: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 44
  },
  searchInput: {
    flex: 1,
    color: '#0f172a',
    fontSize: 13
  },
  categorySection: {
    marginBottom: 8
  },
  categoryScroll: {
    paddingHorizontal: 16,
    gap: 8
  },
  catChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  catChipImg: {
    width: 20,
    height: 20,
    marginRight: 8,
    borderRadius: 4
  },
  catChipActive: {
    backgroundColor: 'rgba(14, 165, 233, 0.15)',
    borderColor: '#0ea5e9'
  },
  catChipText: {
    color: '#64748b',
    fontSize: 12,
    fontWeight: '600'
  },
  catChipTextActive: {
    color: '#0ea5e9',
    fontWeight: '800'
  },
  gridContent: {
    paddingHorizontal: 10,
    paddingBottom: 80
  },
  emptyBox: {
    padding: 40,
    alignItems: 'center'
  },
  emptyText: {
    color: '#64748b',
    fontSize: 13
  },
  groupCard: {
    flex: 1,
    margin: 6,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center'
  },
  sectionHeaderBox: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 8
  },
  sectionHeaderText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0f172a'
  },
  subCategorySection: {
    marginBottom: 8,
    marginTop: -4
  },
  groupImageContainer: {
    width: '100%',
    height: 120,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  groupImage: {
    width: '100%',
    height: '100%'
  },
  groupImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e2e8f0'
  },
  groupTextContainer: {
    width: '100%',
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  groupName: {
    color: '#0f172a',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  modalContent: {
    width: '100%',
    maxHeight: '85%',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    elevation: 8,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    marginBottom: 12
  },
  modalProductTitle: {
    fontSize: 16,
    fontWeight: '805',
    color: '#0f172a'
  },
  modalCategoryTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: '#0ea5e9',
    marginTop: 2
  },
  closeModalBtn: {
    padding: 4,
    borderRadius: 8,
    backgroundColor: '#f1f5f9'
  },
  modalScroll: {
    maxHeight: 380
  },
  modalImage: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    marginBottom: 16
  },
  modalSectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 8
  },
  modalDescription: {
    fontSize: 12,
    color: '#64748b',
    lineHeight: 18,
    marginBottom: 16
  },
  sizesSection: {
    marginBottom: 16
  },
  sizeChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  sizeSelectorChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#ffffff'
  },
  sizeSelectorChipActive: {
    borderColor: '#0ea5e9',
    backgroundColor: 'rgba(14, 165, 233, 0.1)'
  },
  sizeSelectorChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b'
  },
  sizeSelectorChipTextActive: {
    color: '#0ea5e9',
    fontWeight: '800'
  },
  qtySection: {
    marginBottom: 12
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  stepperBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  stepperBtnTxt: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569'
  },
  stepperValue: {
    width: 48,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a'
  },
  modalFooter: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 14
  },
  confirmAddBtn: {
    width: '100%',
    height: 46,
    backgroundColor: '#0ea5e9',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  confirmAddBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800'
  },
  successMessageBtn: {
    width: '100%',
    height: 46,
    backgroundColor: '#10b981',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  successMessageText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '850'
  }
});
module.exports = exports['default'];
/* Top Header */ /* Search Bar */ /* Main Content Area */ /* Category Slider for easy navigation back */ /* Category Slider */ /* Optional: Sub Category Slider if subcategories exist and one is selected */ /* Products Grid (2 per row) */ /* Product Detail & size selection modal */ /* Header */ /* Content */ /* Size Options Selection */ /* Quantity Counter */ /* Footer Add Button */