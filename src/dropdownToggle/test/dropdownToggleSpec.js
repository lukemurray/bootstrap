describe('dropdownToggle', function() {
  var $compile, $rootScope, $document, $location;

  beforeEach(module('ui.bootstrap.dropdownToggle'));

  beforeEach(inject(function(_$compile_, _$rootScope_, _$document_, _$location_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $document = _$document_;
    $location = _$location_;

  }));

  function dropdown(closeOnClick) {
    if (closeOnClick === undefined) {
      closeOnClick = true;
    }
    return $compile('<li class="dropdown"><a dropdown-toggle close-on-click="' + closeOnClick + '"></a><ul dropdown-toggle close-on-click="' + closeOnClick + '"><li>Hello</li></ul><div class="dropdown-menu"></div></li>')($rootScope);
  }
  
  it('should toggle on `a` click', function() {
    var elm = dropdown();
    expect(elm.hasClass('open')).toBe(false);
    elm.find('a').click();
    expect(elm.hasClass('open')).toBe(true);
    elm.find('a').click();
    expect(elm.hasClass('open')).toBe(false);
  });

  it('should toggle on `ul` click', function() {
    var elm = dropdown();
    expect(elm.hasClass('open')).toBe(false);
    elm.find('ul').click();
    expect(elm.hasClass('open')).toBe(true);
    elm.find('ul').click();
    expect(elm.hasClass('open')).toBe(false);
  });

  it('should close on elm click', function() {
    var elm = dropdown();
    elm.find('a').click();
    elm.click();
    expect(elm.hasClass('open')).toBe(false);
  });

  it('should close on document click', function() {
    var elm = dropdown();
    elm.find('a').click();
    $document.click();
    expect(elm.hasClass('open')).toBe(false);
  });

  it('should close on $location change', function() {
    var elm = dropdown();
    elm.find('a').click();
    $location.path('/foo');
    $rootScope.$apply();
    expect(elm.hasClass('open')).toBe(false);
  });

  it('should only allow one dropdown to be open at once', function() {
    var elm1 = dropdown();
    var elm2 = dropdown();
    elm1.find('a').click();
    elm2.find('a').click();
    expect(elm1.hasClass('open')).toBe(false);
    expect(elm2.hasClass('open')).toBe(true);
  });

  it('should not close on click in dropdown-menu when close-on-click="false"', function() {
    var elm1 = dropdown(false);
    elm1.find('a').click();
    expect(elm1.hasClass('open')).toBe(true);
    elm1.parent().find('div').click(); // dropdown-menu
    expect(elm1.hasClass('open')).toBe(true);
  });

  it('should still close on click (outside popup) when close-on-click="false"', function() {
    var elm1 = dropdown(false);
    elm1.find('ul').click();
    expect(elm1.hasClass('open')).toBe(true);
    elm1.click();
    expect(elm1.hasClass('open')).toBe(false);
  });
});
  
